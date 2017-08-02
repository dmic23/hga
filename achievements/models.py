# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.conf import settings
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager
from django.core.files.storage import default_storage
from django.db import models
from django.utils.encoding import smart_unicode
from time import time

def get_upload_file_name(instance, filename):

    return settings.UPLOAD_FILE_PATTERN % (str(time()).replace('.','_'), filename)

class Badge(models.Model):
    BADGE_CATEGORIES = ( 
        ('1', 'White'),
        ('2', 'Red'),
        ('3', 'Yellow'),
        ('4', 'Green'),
        ('5', 'Blue'),
        ('6', 'Purple'),
        ('7', 'Brown'),
        ('8', 'Black'),
    )
	badge_category = models.CharField(max_length=30, choices=BADGE_CATEGORIES, null=True, blank=True, default='1')
	badge_name = models.CharField(max_length=30, null=True, blank=True)


