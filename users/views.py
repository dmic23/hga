# -*- coding: utf-8 -*-
import json
from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.forms import PasswordResetForm
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from django.utils import timezone
# from io import BytesIO
# from ipware.ip import get_ip
from rest_framework import permissions, status, views, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from users.models import User
from users.serializers import UserSerializer
# from authentication.permissions import IsAccountOwner
# from eventlog.models import log


class UserViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # def get_permissions(self):
    #     if self.request.method in permissions.SAFE_METHODS:
    #         return (permissions.AllowAny(),)

    #     if self.request.method == 'POST':
    #         return (permissions.AllowAny(),)
    #     return (permissions.IsAuthenticated(),)

    # def list(self, request):
    #     queryset = self.queryset.filter(is_active=True)
    #     serializer = UserSerializer(queryset, many=True)
    #     return Response(serializer.data)

    # def retrieve(self, request, id=None):
    #     queryset = self.queryset.get(username=username, is_active=True)
    #     serializer = UserSerializer(queryset)
    #     return Response(serializer.data)

    # def perform_create(self, serializer):
    #     if serializer.is_valid():
    #         user = self.request.user
    #         user_company = Company.objects.get(id=self.request.data['company'])
    #         serializer.save(user=self.request.user, user_company=Company.objects.get(id=self.request.data['company']), **self.request.data)
    #         return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response({
    #             'status': 'Bad request',
    #             'message': 'Account could not be created with received data.'
    #         }, status=status.HTTP_400_BAD_REQUEST)

    # def perform_update(self, serializer):
    #     if serializer.is_valid():
    #         if 'file' in self.request.data:
    #             user_pic = self.request.data['file']
    #             serializer.save(user=self.request.user, user_pic=user_pic, **self.request.data)
    #         else:
    #             serializer.save(user=self.request.user, **self.request.data)


class LoginView(views.APIView):

    def post(self, request, format=None):
        data = json.loads(request.body)

        username = data.get('username', None)
        password = data.get('password', None)

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                serialized = UserSerializer(user)
                user = self.request.user
                # ip = get_ip(request)
                # log(
                #     user=user,
                #     company=user.user_company,
                #     not_action='user login',
                #     obj=user,
                #     notification=False,
                #     extra={
                #         'account_id':user.id,
                #         'account_first_name':user.first_name,
                #         'account_last_name':user.last_name,
                #         'login_ip':ip,
                #     }
                # )
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username or password invalid'
            }, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):

    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        user = self.request.user
        # ip = get_ip(request)
        # log(
        #     user=user,
        #     company=user.user_company,
        #     not_action='user logout',
        #     obj=user,
        #     notification=False,
        #     extra={
        #         'account_id':user.id,
        #         'account_first_name':user.first_name,
        #         'account_last_name':user.last_name,
        #         'login_ip':ip,
        #     }
        # )
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)