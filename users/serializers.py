# -*- coding: utf-8 -*-
from django.contrib.auth import update_session_auth_hash
from datetime import date
from django.utils import timezone
from rest_framework import serializers, status
# from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from users.models import User, StudentGoal, StudentPracticeLog, StudentObjective, StudentWishList, StudentMaterial

class StudentGoalSerializer(serializers.ModelSerializer):
    goal = serializers.CharField(required=False)
    student = serializers.CharField(required=False)
    goal_target_date = serializers.DateTimeField(format=None, input_formats=None, required=False)

    class Meta:
        model = StudentGoal
        fields = ('id', 'student', 'goal', 'goal_target_date', 'goal_complete', 'goal_complete_date', 'goal_notes', 'goal_created',)


class StudentPracticeLogSerializer(serializers.ModelSerializer):
    practice_category_display = serializers.SerializerMethodField(source='practice_category', required=False)
    practice_date = serializers.DateTimeField(format=None, input_formats=None, required=False)


    class Meta:
        model = StudentPracticeLog
        fields = ('id', 'student', 'practice_category', 'practice_category_display', 'practice_item', 'practice_time', 'practice_speed', 'practice_notes', 'practice_date', 'practice_item_created',)

    def get_practice_category_display(self,obj):
        return obj.get_practice_category_display();

class StudentObjectiveSerializer(serializers.ModelSerializer):
    objective = serializers.CharField(required=False)
    student = serializers.CharField(required=False)

    class Meta:
        model = StudentObjective
        fields = ('id', 'student', 'objective', 'objective_complete', 'objective_complete_date', 'objective_notes', 'objective_created',)


class StudentWishListSerializer(serializers.ModelSerializer):
    wish_item = serializers.CharField(required=False)
    student = serializers.CharField(required=False)

    class Meta:
        model = StudentWishList
        fields = ('id', 'student', 'wish_item', 'wish_item_complete', 'wish_item_complete_date', 'wish_item_notes', 'wish_item_created',)

class StudentMaterialSerializer(serializers.ModelSerializer):
    material_added_by = serializers.CharField(required=False)

    class Meta:
        model = StudentMaterial
        fields = ('id', 'student', 'file', 'material_name', 'material_notes', 'material_added', 'material_added_by',)

class UserSerializer(serializers.ModelSerializer):
    play_level_display = serializers.CharField(source='get_play_level_display', required=False)
    student_goal = StudentGoalSerializer(many=True, required=False)
    student_log = StudentPracticeLogSerializer(many=True, required=False)
    student_objective = StudentObjectiveSerializer(many=True, required=False)
    student_wishlist = StudentWishListSerializer(many=True, required=False)
    student_material = StudentMaterialSerializer(many=True, required=False)
    
    class Meta:
        model = User
        fields = ('id', 'user_created', 'user_updated', 'is_active', 'is_admin', 'is_staff', 'username', 'first_name', 'last_name', 'user_pic',
                'location', 'play_level', 'play_level_display', 'email', 'student_goal', 'student_log', 'student_objective', 'student_wishlist', 'student_material',)
        read_only_fields = ('id', 'user_created', 'is_active', 'is_admin', 'is_staff',)

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            instance.set_password(password)
            instance.save()

            update_session_auth_hash(self.context.get('request'), instance)

        return instance



