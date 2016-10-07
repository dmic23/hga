# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-19 02:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0002_auto_20160618_2109'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='course_days',
        ),
        migrations.AddField(
            model_name='course',
            name='course_fri',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='course',
            name='course_mon',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='course',
            name='course_sat',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='course',
            name='course_sun',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='course',
            name='course_thu',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='course',
            name='course_tue',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='course',
            name='course_wed',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='course',
            name='course_avail_end',
            field=models.TimeField(blank=True, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='course',
            name='course_avail_start',
            field=models.TimeField(blank=True, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='courseschedule',
            name='schedule_end_time',
            field=models.TimeField(blank=True, max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='courseschedule',
            name='schedule_start_time',
            field=models.TimeField(blank=True, max_length=6, null=True),
        ),
    ]