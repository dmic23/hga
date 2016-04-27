# -*- coding: utf-8 -*-
# from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers, status
# from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from users.models import User, StudentGoal, StudentPracticeLog, StudentObjective, StudentWishList

class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'user_created', 'user_updated', 'is_active', 'is_admin', 'username', 'first_name', 'last_name', 'user_pic', 'location', 'play_level', 'email', )


class StudentGoalSerializer(serializers.ModelSerializer):

	class Meta:
		model = StudentGoal
		fields = ('id', 'student', 'goal', 'goal_target_date', 'goal_complete', 'goal_complete_date', 'goal_notes', 'goal_created',)


class StudentPracticeLogSerializer(serializers.ModelSerializer):

	class Meta:
		model = StudentPracticeLog
		fields = ('id', 'student', 'practice_item', 'practice_time', 'practice_speed', 'log_notes', 'log_item_created',)


class StudentObjectiveSerializer(serializers.ModelSerializer):

	class Meta:
		model = StudentObjective
		fields = ('id', 'student', 'objective', 'objective_complete', 'objective_complete_date', 'objective_notes', 'objective_created',)


class StudentWishListSerializer(serializers.ModelSerializer):

	class Meta:
		model = StudentWishList
		fields = ('id', 'student', 'wish_item', 'wish_item_complete', 'wish_item_complete_date', 'wish_item_notes', 'wish_item_created',)
