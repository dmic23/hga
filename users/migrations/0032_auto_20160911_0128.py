# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-09-11 06:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0031_auto_20160909_1648'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentobjective',
            name='objective_priority',
            field=models.CharField(blank=True, max_length=3, null=True),
        ),
        migrations.AddField(
            model_name='studentobjective',
            name='objective_visible',
            field=models.BooleanField(default=True),
        ),
    ]
