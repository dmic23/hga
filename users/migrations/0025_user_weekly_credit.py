# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-07-12 20:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0024_auto_20160702_1448'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='weekly_credit',
            field=models.CharField(blank=True, default=0, max_length=2, null=True),
        ),
    ]
