from django.shortcuts import render
from rest_framework.decorators import api_view
from django.shortcuts import render,redirect
from rest_framework.response import Response
from .serializers import *
from .models import *


# Create your views here.
@api_view(['GET'])
def getUser(request):
    users = User.objects.all()
    ser_user = UserSerializer(users,many=True)
    return Response({"success":"True","users":ser_user.data})

@api_view(['GET'])
def getProfile(request):
    profiles = Profile.objects.all()
    ser_profs = ProfileSerializer(profiles,many=True)
    return Response({"success":"True","profiles":ser_profs.data})