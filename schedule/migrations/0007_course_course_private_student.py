# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-19 05:38
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('schedule', '0006_course_course_private'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='course_private_student',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]