# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-30 08:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0014_auto_20160629_1307'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='course_notes',
        ),
        migrations.RemoveField(
            model_name='courseschedule',
            name='schedule_notes',
        ),
    ]