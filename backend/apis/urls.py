from django.contrib import admin
from django.urls import path,include

from . import views
urlpatterns = [
    path('get-users', views.getUser),
    path('get-profiles', views.getProfile),
]