# -*- coding: utf-8 -*-
import json
from django.core.exceptions import ValidationError
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import permissions, status, views, viewsets
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser, FileUploadParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings
from messaging.models import MessageGroup, MessageMaterial, Message
from messaging.serializers import MessageGroupSerializer, MessageMaterialSerializer, MessageSerializer

class MessageGroupViewSet(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = MessageGroup.objects.all()
    serializer_class = MessageGroupSerializer
    # permission_classes = (IsAuthenticated,)
    # authentication_classes = (JSONWebTokenAuthentication,)

    def list(self, request, id=None):
        if self.request.user.is_admin:
            queryset = MessageGroup.objects.filter(messages__message_created_by=self.request.user)
        else:
            queryset = MessageGroup.objects.filter(messages__message_created_by=self.request.user)
        serializer = MessageGroupSerializer(queryset, many=True)
        return Response(serializer.data)   


