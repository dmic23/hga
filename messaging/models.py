# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from time import time
from django.conf import settings
from django.contrib.auth.models import User
from django.core.files.storage import default_storage
from django.db import models
from django.utils.encoding import smart_unicode
from schedule.models import CourseSchedule
from users.models import get_upload_file_name


class Message(models.Model):

    message_text = models.TextField(null=True, blank=True)
    message_created = models.DateTimeField(auto_now_add=True)
    message_created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='message_created_user')
    message_updated = models.DateTimeField(auto_now=True)
    message_updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='message_updated_user', null=True, blank=True)
    message_user = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='student_message', blank=True)

    def __unicode__(self):
        return smart_unicode(self.id)

class MessageMaterial(models.Model):

    message = models.ForeignKey(Message, related_name='material_message')
    message_material = models.FileField(upload_to=get_upload_file_name, null=True, blank=True)
    message_material_created = models.DateTimeField(auto_now_add=True)
    message_material_created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='message_material_created_user')
    message_material_updated = models.DateTimeField(auto_now=True)
    message_material_updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='message_material_updated_user', null=True, blank=True)

class MessageReply(models.Model):

    message = models.ForeignKey(Message, related_name='reply_message')
    reply_text = models.TextField(null=True, blank=True)
    reply_message_created = models.DateTimeField(auto_now_add=True)
    reply_message_created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reply_message_created_user')
    reply_message_updated = models.DateTimeField(auto_now=True)
    reply_message_updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reply_message_updated_user', null=True, blank=True)

class StudentFeedback(Message):

    course = models.ForeignKey(CourseSchedule, related_name='course_feedback')

    def __unicode__(self):
        return smart_unicode(self.id)