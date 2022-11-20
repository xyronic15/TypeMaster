import random
from api.models import Quote, Record, Typer
from api.serializers import CreateTyperSerializer, LoginTyperSerializer, QuoteSerializer, RecordSerializer, StatSerializer, TyperSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny

# Create your views here.

# API view that list all users
class ListTypersView(generics.ListAPIView):
    permission_classes=[AllowAny]
    queryset = Typer.objects.all()
    serializer_class = TyperSerializer

# API view used to create an account/typer
class CreateTyperView(APIView):
    permission_classes = [AllowAny]
    serializer_class = CreateTyperSerializer

    def post(self, request, format=None):
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()

        print(request.data)
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            username = serializer.data.get('username')
            username_query_set = Typer.objects.filter(username=username)
            email_query_set = Typer.objects.filter(email=email)
            if username_query_set.exists() or email_query_set.exists():
                return Response({'Bad Request': 'Username or email already in use...'}, status=status.HTTP_409_CONFLICT)
            else:
                typer = get_user_model().objects.create_user(email=email, username=username, password=password)
                return Response(TyperSerializer(typer).data, status=status.HTTP_201_CREATED)
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
# API View to login user
class LoginTyperView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginTyperSerializer

    def post(self, request, format=None):
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()

        print(request.data)
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            typer = get_user_model().objects.get(email=email)
            if typer.check_password(password):
                login(request, typer)
                return Response({'msg': 'Logged in successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Incorrect email or password'}, status=status.HTTP_401_UNAUTHORIZED)
        except get_user_model().DoesNotExist:
            return Response({'msg': 'Incorrect email or password'}, status=status.HTTP_401_UNAUTHORIZED)

# API view to logout user
class LogoutTyperView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        if request.user.is_authenticated:
            print(request.user)
            logout(request)
            return Response({'msg': 'User successfully logged out'}, status=status.HTTP_200_OK)
        else:
            return Response({'Bad Request': 'No user logged in'}, status=status.HTTP_400_BAD_REQUEST)

# API view to get the current typer if logged in
# class GetCurrentTyperView(APIView):

#     def get(self, request, format=None):
#         if request.user.is_authenticated:
#             print(request.user)
#             return Response({'current_typer': request.user.username}, status=status.HTTP_200_OK)
#         else:
#             return Response({'current_typer': ''}, status=status.HTTP_200_OK)

# API view to retrieve user's current stats
class GetCurrentStatsView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = StatSerializer

    def get(self, request, format=None):
        if request.user.is_authenticated:
            typer = request.user
            print(typer)
            return Response(self.serializer_class(typer).data, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'No user logged in'}, status=status.HTTP_403_FORBIDDEN)

# API view to add a new record
class NewRecordView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RecordSerializer

    def post(self, request, format=None):
        if request.user.is_authenticated:
            typer = request.user
            speed = request.data.get('speed')
            accuracy = request.data.get('accuracy')

            record = Record(typer=typer, speed=speed, accuracy=accuracy)
            record.save()

            serializer = self.serializer_class(record)

            typer_serializer = update_typer_stats(typer.username)
            print(typer_serializer.data)
            if typer_serializer:
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                record.delete()
                return Response({"Bad Request": 'User stats could not be updated'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'msg': 'No user is logged in'}, status=status.HTTP_200_OK)
        
# API view to list all records unless user is logged in
class GetAllRecords(generics.ListAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    serializer_class = RecordSerializer

    def get_queryset(self):

        if self.request.user.is_authenticated:
            query_set = Record.objects.filter(typer=self.request.user).order_by('-created_at')
        else:
            query_set = Record.objects.raw("SELECT *, MAX(speed) FROM api_record GROUP BY typer_id")

        return query_set

# API view to add a quote
class AddQuoteView(APIView):
    permission_classes = [AllowAny]
    serializer_class = QuoteSerializer

    def post(self, request, format=None):
        print(request.data)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            text = serializer.data.get('text')
            quotee = serializer.data.get('quotee')
            source = serializer.data.get('source')
            tags = serializer.data.get('tags')
            query_set = Quote.objects.filter(text=text)
            if query_set.exists():
                quote = query_set[0]
                quote.quotee = quotee if not quote.quotee else quote.quotee
                quote.source = source if not quote.source else quote.source
                quote.tags = tags if not quote.tags else quote.tags
                quote.save(update_fields=['quotee', 'source', 'tags'])
                return Response(QuoteSerializer(quote).data, status=status.HTTP_204_NO_CONTENT)
            else:
                quote = Quote(text=text, quotee=quotee, source=source, tags=tags)
                quote.save()
                return Response(QuoteSerializer(quote).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)

# API view to get all the quotes
class GetAllQuotesView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer

# API view to get a random quote
class RandomQuoteView(APIView):
    permission_classes = [AllowAny]
    serializer_class = QuoteSerializer

    def get(self, request, format=None):
        
        quotes = list(Quote.objects.all())

        quote = random.choice(quotes)

        if quote:
            return Response(QuoteSerializer(quote).data, status=status.HTTP_200_OK)
        else:
            return Response({"Bad Request": "Could not get quote"}, status=status.HTTP_404_NOT_FOUND)

### Helper functions

# function used to update the user's current stats
def update_typer_stats(username):

    typer = Typer.objects.get(username=username)
    speeds = Record.objects.filter(typer=typer).order_by('-created_at').values_list('speed', flat=True)[:10]
    accuracies = Record.objects.filter(typer=typer).order_by('-created_at').values_list('accuracy', flat=True)[:10]
    avg_speed = sum(speeds) / len(speeds)
    avg_accuracy = sum(accuracies) / len(accuracies)
    print(avg_speed)
    print(avg_accuracy)

    Typer.objects.filter(username=username).update(avg_speed=avg_speed)
    Typer.objects.filter(username=username).update(avg_accuracy=avg_accuracy)

    serializer = StatSerializer(Typer.objects.get(username=username))
    print(serializer.data)
    return serializer

# JWT Token classes
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer