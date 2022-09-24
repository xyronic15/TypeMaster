from django.urls import path

from api.views import CreateTyperView, ListTypersView, LoginTyperView

urlpatterns = [
    path('typers', ListTypersView.as_view()),
    path('create-typer', CreateTyperView.as_view()),
    path('login-typer', LoginTyperView.as_view()),
]
