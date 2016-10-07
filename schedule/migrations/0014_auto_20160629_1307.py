# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-29 18:07
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0013_auto_20160625_1426'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courseschedule',
            name='schedule_created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='schedule_created', to=settings.AUTH_USER_MODEL),
        ),
    ]