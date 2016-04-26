# -*- coding: utf-8 -*-
# from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers, status
# from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'user_created', 'user_updated', 'is_active', 'is_admin', 'username', 'first_name', 'last_name', 'user_pic', 'location', 'play_level', 'email', )
