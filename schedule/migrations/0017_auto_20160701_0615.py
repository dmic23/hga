# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-07-01 11:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0016_course_course_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courseschedule',
            name='course',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='schedule.Course'),
        ),
    ]
