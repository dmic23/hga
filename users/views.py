# -*- coding: utf-8 -*-
import json
from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.forms import PasswordResetForm
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from django.utils import timezone
from io import BytesIO
# from ipware.ip import get_ip
from rest_framework import permissions, status, views, viewsets
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser, FileUploadParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
# from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from users.models import User, StudentGoal, StudentPracticeLog, StudentObjective, StudentWishList, StudentMaterial
from users.serializers import UserSerializer, StudentGoalSerializer, StudentPracticeLogSerializer, StudentObjectiveSerializer, StudentWishListSerializer, StudentMaterialSerializer
# from authentication.permissions import IsAccountOwner
# from eventlog.models import log


class UserViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated, )
    # authentication_classes = (JSONWebTokenAuthentication, )

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

    def perform_update(self, serializer):
        if serializer.is_valid():
            print "SRD == %s" %self.request.data
            if 'user_pic' in self.request.data:
                temp_file = self.request.data.pop('user_pic')

            file_dict = {}
            for i in self.request.data:
                print "I == %s" %i
                if i != 'user_pic': 
                    print "I in not === %s" %i
                    item = self.request.data[i]
                    print "ITEM == %s" %item
                    file_dict[i] = item
                    print "FILE DICT === %s" %file_dict
                print "FILE no file === %s" %file_dict
            for f in temp_file:
                print "F === %s" %f
                file_dict['user_pic'] = f
            print "FILE DICT All=== %s" %file_dict

            serializer.save(user_updated_by=self.request.user, **file_dict)

class StudentGoalsViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = StudentGoal.objects.all()
    serializer_class = StudentGoalSerializer

    def perform_create(self, serializer):
        if serializer.is_valid():
            studentId = self.request.data.pop('student')
            student = User.objects.get(id=studentId)
            serializer.save(student=student, goal_created_by=self.request.user, **self.request.data)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(goal_updated_by=self.request.user, **self.request.data)


class StudentPracticeLogViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = StudentPracticeLog.objects.all()
    serializer_class = StudentPracticeLogSerializer

    def perform_create(self, serializer):
        if serializer.is_valid():
            studentId = self.request.data.pop('student')
            student = User.objects.get(id=studentId)
            serializer.save(student=student, practice_item_created_by=self.request.user, **self.request.data)

    def perform_update(self, serializer):
        if serializer.is_valid():
            studentId = self.request.data.pop('student')
            serializer.save(practice_item_updated_by=self.request.user, **self.request.data)


class StudentObjectiveViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = StudentObjective.objects.all()
    serializer_class = StudentObjectiveSerializer

    def perform_create(self, serializer):
        if serializer.is_valid():
            studentId = self.request.data.pop('student')
            student = User.objects.get(id=studentId)
            serializer.save(student=student, objective_created_by=self.request.user, **self.request.data)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(objective_updated_by=self.request.user, **self.request.data)


class StudentWishListViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = StudentWishList.objects.all()
    serializer_class = StudentWishListSerializer

    def perform_create(self, serializer):
        if serializer.is_valid():
            studentId = self.request.data.pop('student')
            student = User.objects.get(id=studentId)
            serializer.save(student=student, wish_item_created_by=self.request.user, **self.request.data)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(wish_item_updated_by=self.request.user, **self.request.data)


class StudentMaterialsViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = StudentMaterial.objects.all()
    serializer_class = StudentMaterialSerializer
    # parser_classes = (MultiPartParser, FormParser,)

    def perform_create(self, serializer):
        if serializer.is_valid():
            print "SELF-REQ-DATA === %s" %self.request.data
            if 'file' in self.request.data:
                temp_file = self.request.data.pop('file')

            file_dict = {}
            for i in self.request.data:
                print "I == %s" %i
                if i != 'file': 
                    print "I in not === %s" %i
                    item = self.request.data[i]
                    print "ITEM == %s" %item
                    file_dict[i] = item
                    print "FILE DICT === %s" %file_dict
                print "FILE no file === %s" %file_dict
            # temp_file = self.request.data.pop('file')
            for f in temp_file:
                print "F === %s" %f
                file_dict['file'] = f
            print "FILE DICT All=== %s" %file_dict
            studentId = file_dict.pop('student')
            print "STUDENT ID-- %s" %studentId
            student = User.objects.get(id=studentId)
            serializer.save(student=student, material_added_by=self.request.user, **file_dict)

    def perform_update(self, serializer):
        if serializer.is_valid():
            print "SELF-REQ-DATA === %s" %self.request.data
            if 'file' in self.request.data:
                print "FILE !"
                temp_file = self.request.data.pop('file')
            # studentId = self.request.data.pop('student')
            # material_added_by = self.request.data.pop('material_added_by')
            # exclude = ('file','student','material_added_by') 
            print "SELF-REQ-DATA 2 === %s" %self.request.data
            file_dict = {}
            for i in self.request.data:
                print "I == %s" %i
                # if i.decode('unicode-escape') in exclude: 
                print "I in not === %s" %i
                item = self.request.data[i]
                print "ITEM == %s" %item
                file_dict[i] = item
                print "FILE DICT === %s" %file_dict
                print "FILE no file === %s" %file_dict
            # temp_file = self.request.data.pop('file')
            for f in temp_file:
                print "F === %s" %f
                file_dict['file'] = f
            print "FILE DICT All=== %s" %file_dict
            # studentId = file_dict.pop('student')
            # print "STUDENT ID-- %s" %studentId
            # student = User.objects.get(id=studentId)
            serializer.save(**file_dict)


class LoginView(views.APIView):
    # authentication_classes = (JSONWebTokenAuthentication, )
    def post(self, request, format=None):
        username = request.data['username']
        password = request.data['password']

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