# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-07-12 20:41
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0025_user_weekly_credit'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='weekly_credit',
            new_name='recurring_credit',
        ),
    ]