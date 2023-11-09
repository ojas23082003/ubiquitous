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
from rest_framework_jwt.utils import jwt_decode_handler

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

@api_view(['POST'])
def getHistory(request):
    id = request.data['id']
    profile = Profile.objects.filter(id=id).first()
    if profile is None:
        return Response({"success":False,"message":"No user found"})
    historys = profile.history.all()
    ser_profile = ProfileSerializer(profile,many=False)
    ser_history = HistorySerializer(historys,many=True)
    return Response({"success":True,"profile":ser_profile.data,"history":ser_history.data})

@api_view(['POST'])
def getDetails(request):
    access = request.data['access']
    decoded_payload = jwt_decode_handler(access)
    print(decoded_payload)
    id = decoded_payload['user_id']
    profile = Profile.objects.filter(user__id=id).first()
    if profile is None:
        return Response({"success":False,"message":"No profile found"})
    ser_profile = ProfileSerializer(profile,many=False)
    history = profile.history.all()
    ser_history = HistorySerializer(history,many=True)
    user = profile.user
    ser_user = UserSerializer(user,many=False)
    return Response({"success":True,"profile":ser_profile.data,"user":ser_user.data,"histpry":ser_history.data})
    # return Response({"success":True,"decoded":"Data"})

@api_view(['POST'])
def addUser(request):
    data = request.data
    user = User(first_name=data['first_name'],last_name=data['last_name'],email=data['email'],username=data['username'])
    user.set_password(data['password'])
    user.save()
    profile = Profile(dob=data['dob'],gender=data['gender'],user=user,phone=int(data['phone']))
    profile.save()
    return Response({"status":True,"message":"User registered successfuly"})