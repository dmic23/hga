# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-27 02:24
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_remove_studentpracticelog_top_speed'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentMaterials',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('material', models.FileField(blank=True, null=True, upload_to=users.models.get_upload_file_name)),
                ('material_notes', models.TextField(blank=True, null=True)),
                ('material_added', models.DateTimeField(auto_now_add=True)),
                ('material_added_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='material_added_user', to=settings.AUTH_USER_MODEL)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='materials_student', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StudentWishList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wish_item', models.CharField(max_length=250)),
                ('wish_item_complete', models.BooleanField(default=False)),
                ('wish_item_complete_date', models.DateTimeField(blank=True, max_length=50, null=True)),
                ('wish_item_notes', models.TextField(blank=True, null=True)),
                ('wish_item_created', models.DateTimeField(auto_now_add=True)),
                ('wish_item_updated', models.DateTimeField(auto_now_add=True)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wishlist_student', to=settings.AUTH_USER_MODEL)),
                ('wish_item_created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wish_item_created_user', to=settings.AUTH_USER_MODEL)),
                ('wish_item_updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='wish_item_updated_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
