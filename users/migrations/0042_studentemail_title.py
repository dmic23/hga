# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-10-03 22:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0041_studentemail'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentemail',
            name='title',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
