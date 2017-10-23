# -*- coding: utf-8 -*-
import datetime
import json
from datetime import date
from django.utils import timezone
from rest_framework import serializers, status
from rest_framework.response import Response
from messaging.models import MessageGroup, Message, MessageMaterial, StudentFeedback
from users.serializers import SimpleUserSerializer


class MessageMaterialSerializer(serializers.ModelSerializer):

	class Meta:
		model = MessageMaterial
		fields = ('id', 'message', 'message_material', 'message_material_created',
			'message_material_created_by', 'message_material_updated', 'message_material_updated_by',)


class MessageSerializer(serializers.ModelSerializer):
	material_message = MessageMaterialSerializer(required=False, many=True)
	message_created_by = SimpleUserSerializer(required=False)

	class Meta:
		model = Message
		fields = ('id', 'message_group', 'message_text', 'message_created', 'message_created_by',
			'message_updated', 'message_updated_by','message_visible', 'material_message',)


class MessageGroupSerializer(serializers.ModelSerializer):
	messages = MessageSerializer(required=False, many=True)

	class Meta:
		model = MessageGroup
		fields = ('id', 'message_group_name', 'message_group_created', 'message_group_created_by',
			'message_group_updated', 'message_group_updated_by', 'message_group_visible', 'messages',)