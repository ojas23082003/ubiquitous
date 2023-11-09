from django.shortcuts import render
from rest_framework.decorators import api_view
from django.shortcuts import render,redirect
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import *
from .models import *
from django.contrib.auth.models import User


# Create your views here.
@api_view(['GET'])
def getUser(request):
    users = User.objects.all()
    ser_user = UserSerializer(users,many=True)
    return Response({"success":True,"users":ser_user.data})

@api_view(['GET'])
def getProfile(request):
    profiles = Profile.objects.all()
    ser_profs = ProfileSerializer(profiles,many=True)
    return Response({"success":True,"profiles":ser_profs.data})

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username = request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        return Response({"success":True,"user":serializer.data})
    return Response({"success":False,"message":"An error occured"})

@api_view(['POST'])
def getUser(request):
    id = request.data['id']
    user = User.objects.filter(id=id)
    if len(user)==0:
        return Response({"success":False,"message":"No user found"})
    ser_user = UserSerializer(user[0],many=False)
    return Response({"success":True,"user":ser_user.data})

@api_view(['POST'])
def addData(request):
    id = request.data['id']
    is_sad = int(request.data['is_sad'])
    profile = Profile.objects.filter(id=id).first()
    if profile is None:
        return Response({"success":False,"message":"No profile found"})
    if is_sad==1:
        profile.is_sad=True
        profile.save()
        ser_profile = ProfileSerializer(profile,many=False)
        return Response({"success":True,"profile":ser_profile.data})
    ser_profile = ProfileSerializer(profile,many=False)
    return Response({"success":True,"profile":ser_profile.data})
    