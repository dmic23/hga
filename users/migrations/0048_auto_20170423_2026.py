# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-04-24 01:26
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0047_auto_20170420_2233'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentlabel',
            name='label_created_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='label_created_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
