# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-20 00:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_auto_20160515_0942'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(default='blah@blah.com', max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='location',
            field=models.CharField(blank=True, default='Ruston', max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='play_level',
            field=models.CharField(blank=True, choices=[('WHITE', 'White'), ('RED', 'Red'), ('YELLOW', 'Yellow'), ('GREEN', 'Green'), ('BLUE', 'Blue'), ('PURPLE', 'Purple'), ('BROWN', 'Brown'), ('BLACK', 'Black')], default='WHITE', max_length=20, null=True),
        ),
    ]
