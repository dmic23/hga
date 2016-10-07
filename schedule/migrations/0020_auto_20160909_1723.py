# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-09-09 22:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0019_course_course_location'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='course_recurring',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='course',
            name='course_recurring_end_date',
            field=models.DateTimeField(blank=True, max_length=50, null=True),
        ),
    ]
