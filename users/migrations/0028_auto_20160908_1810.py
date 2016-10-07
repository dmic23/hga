# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-09-08 23:10
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0027_auto_20160824_1713'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='location',
            field=models.ManyToManyField(blank=True, related_name='user_location', to='users.Location'),
        ),
    ]
