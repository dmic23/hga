# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-09-30 00:07
from __future__ import unicode_literals

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0038_auto_20160926_1601'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentmaterial',
            name='material_updated',
            field=models.DateTimeField(auto_now=True, default=datetime.datetime(2016, 9, 30, 0, 7, 18, 397484, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='studentmaterial',
            name='material_updated_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='material_updated_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
