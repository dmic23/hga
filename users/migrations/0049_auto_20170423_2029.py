# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-04-24 01:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0048_auto_20170423_2026'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentlabel',
            name='label_created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
