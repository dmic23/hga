# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-10-04 06:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0043_auto_20161004_0131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentemail',
            name='bcc',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='studentemail',
            name='cc',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name='studentemail',
            name='from_email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
