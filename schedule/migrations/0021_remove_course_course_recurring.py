# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-09-09 22:42
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0020_auto_20160909_1723'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='course_recurring',
        ),
    ]