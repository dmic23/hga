# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-06-15 19:55
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0003_messagefile'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Message',
            new_name='ForumMessage',
        ),
    ]
