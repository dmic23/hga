# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-22 19:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0009_course_course_recurring'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='course_age_range',
        ),
        migrations.AddField(
            model_name='course',
            name='course_age_max',
            field=models.CharField(blank=True, max_length=2, null=True),
        ),
        migrations.AddField(
            model_name='course',
            name='course_age_min',
            field=models.CharField(blank=True, max_length=2, null=True),
        ),
    ]
