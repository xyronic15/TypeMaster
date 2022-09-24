from turtle import update
from django.shortcuts import render
from api.models import Typer
from api.serializers import CreateTyperSerializer, LoginTyperSerializer, StatSerializer, TyperSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.contrib.auth import login

# Create your views here.

# API view that list all users
class ListTypersView(generics.ListAPIView):
    queryset = Typer.objects.all()
    serializer_class = TyperSerializer

# API view used to create an account/typer
class CreateTyperView(APIView):
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

