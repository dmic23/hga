# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-27 02:26
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_studentmaterials_studentwishlist'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='StudentMaterials',
            new_name='StudentMaterial',
        ),
    ]
