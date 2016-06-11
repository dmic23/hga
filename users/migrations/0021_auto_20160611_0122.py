# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-11 06:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0020_auto_20160531_2209'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='play_level',
            field=models.CharField(blank=True, choices=[('1', 'White'), ('2', 'Red'), ('3', 'Yellow'), ('4', 'Green'), ('5', 'Blue'), ('6', 'Purple'), ('7', 'Brown'), ('8', 'Black')], default='1', max_length=20, null=True),
        ),
    ]