# -*- coding: utf-8 -*-
import datetime
import json
from datetime import date
# from django.contrib.auth import update_session_auth_hash
# from django.db.models import Q
from django.utils import timezone
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from messaging.models import Message, MessageMaterial, MessageReply, StudentFeedback
from schedule.models import CourseSchedule
# from users.models import User
from users.serializers import SimpleUserSerializer


class MessageMaterialSerializer(serializers.ModelSerializer):

	class Meta:
		model = MessageMaterial
		fields = ('id', 'message', 'message_material', 'message_material_created',
			'message_material_created_by', 'message_material_updated', 'message_material_updated_by',)


class MessageReplySerializer(serializers.ModelSerializer):

	class Meta:
		model = MessageReply
		fields = ('id', 'message', 'reply_text', 'reply_message_created', 'reply_message_created_by',
			'reply_message_updated', 'reply_message_updated_by',)


class MessageSerializer(serializers.ModelSerializer):

	reply_message = MessageReplySerializer(required=False, many=True)
	material_message = MessageMaterialSerializer(required=False, many=True)
	message_user = SimpleUserSerializer(required=False, many=True)

	class Meta:
		model = Message
		fields = ('id', 'message_text', 'message_created', 'message_created_by',
			'message_updated', 'message_updated_by', 'message_user', 'material_message', 'reply_message',)