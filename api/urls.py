from django.urls import path

from api.views import CreateTyperView, GetAllRecords, GetCurrentStatsView, GetCurrentTyperView, ListTypersView, LoginTyperView, LogoutTyperView, NewRecordView

urlpatterns = [
    path('typers', ListTypersView.as_view()),
    path('create-typer', CreateTyperView.as_view()),
    path('login-typer', LoginTyperView.as_view()),
    path('logout-typer', LogoutTyperView.as_view()),
    path('get-typer', GetCurrentTyperView.as_view()),
    path('get-stats', GetCurrentStatsView.as_view()),
    path('new-record', NewRecordView.as_view()),
    path('get-all', GetAllRecords.as_view()),
]
