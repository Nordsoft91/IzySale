from django.shortcuts import render
from django.db import IntegrityError
from rest_framework_simplejwt import serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CustomTokenObtainPairSerializer, CustomUserSerializer

# Create your views here.
class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        try:
            serializer = CustomUserSerializer(data=request.data)
            serializer.create(request.data)
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)