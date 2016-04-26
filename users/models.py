# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.files.storage import default_storage
from django.db import models
from django.utils.encoding import smart_unicode
from time import time
from student_portal import settings

def get_upload_file_name(instance, filename):

    return settings.UPLOAD_FILE_PATTERN % (str(time()).replace('.','_'), filename)

class UserManager(BaseUserManager):

    def create_user(self, username, password=None, **kwargs):
        if not username:
            raise ValueError('Users must have a valid username.')

        user = self.model(
            username=kwargs.get('username'),
            first_name=kwargs.get('first_name'), last_name=kwargs.get('last_name'),
            )
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, username, password, **kwargs):
        user = self.create_user(password=password)
        user.username = username
        user.is_admin = True
        user.save()

        return user

class User(AbstractBaseUser):

    username = models.CharField(max_length=50, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    first_name = models.CharField(max_length=50, null=True, blank=True)
    last_name = models.CharField(max_length=50, null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    user_pic = models.FileField(upload_to=get_upload_file_name, null=True, blank=True, default='images/blank_user.png')
    user_created = models.DateTimeField(auto_now_add=True)
    user_created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='created_user', null=True, blank=True, unique=False)
    user_updated = models.DateTimeField(auto_now=True)
    user_updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='updated_user', null=True, blank=True, unique=False)
    location = models.CharField(max_length=50, null=True, blank=True)
    play_level = models.CharField(max_length=50, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'

    def __unicode__(self):
        return smart_unicode(self.username)

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

    @property
    def is_superuser(self):
        return self.is_admin

    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_admin  


class StudentGoals(models.Model):
	
	student = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='goal_student') 
	goal = models.CharField(max_length=250)
	goal_target_date = models.DateTimeField(max_length=50, null=True, blank=True)
	goal_complete = models.BooleanField(default=False)
	goal_complete_date = models.DateTimeField(max_length=50, null=True, blank=True)
	goal_notes = models.TextField(null=True, blank=True)
	goal_created = models.DateTimeField(auto_now_add=True)
	goal_created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='goal_created_user')
	goal_updated = models.DateTimeField(auto_now=True)
	goal_updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='goal_updated_user')

    def __unicode__(self):
        return smart_unicode(self.goal)

class StudentPracticeLog(models.Model):

	student = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='log_student')
	practice_item = models.CharField(max_length=50)
	practice_time = models.CharField(max_length=50, null=True, blank=True)
	practice_speed = models.CharField(max_length=50, null=True, blank=True)
	top_speed = models.CharField(max_length=50, null=True, blank=True)
	log_item_created = models.DateTimeField(auto_now_add=True)
	log_item_created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='log_created_user')
	log_item_updated = models.DateTimeField(auto_now=True)
	log_item_updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='log_updated_user')

    def __unicode__(self):
        return smart_unicode(self.practice_item)

class StudentObjectives(models.Model):

	student = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='objective_student')
	objective = models.CharField(max_length=250)
	objective_complete = models.BooleanField(default=False)
	objective_complete_date = models.DateTimeField(max_length=50, null=True, blank=True)
	objective_notes = models.TextField(null=True, blank=True)
	objective_created = models.DateTimeField(auto_now_add=True)
	objective_created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='objective_created_user')
	objective_updated = models.DateTimeField(auto_now=True)
	objective_updated_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='objective_updated_user')

    def __unicode__(self):
        return smart_unicode(self.objective)

