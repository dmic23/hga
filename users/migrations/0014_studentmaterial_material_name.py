# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-15 04:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0013_studentpracticelog_practice_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentmaterial',
            name='material_name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
