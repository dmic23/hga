# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-25 19:26
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0012_auto_20160623_2213'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='rank_black',
            new_name='black',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='rank_blue',
            new_name='blue',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='rank_brown',
            new_name='brown',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='rank_green',
            new_name='green',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='rank_purple',
            new_name='purple',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='rank_red',
            new_name='red',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='rank_white',
            new_name='white',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='rank_yellow',
            new_name='yellow',
        ),
    ]
