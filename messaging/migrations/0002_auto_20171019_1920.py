# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-10-20 00:20
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('messaging', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MessageGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message_group_name', models.TextField(blank=True, null=True)),
                ('message_group_created', models.DateTimeField(auto_now_add=True)),
                ('message_group_updated', models.DateTimeField(auto_now=True)),
                ('message_group_created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message_group_created_user', to=settings.AUTH_USER_MODEL)),
                ('message_group_updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='message_group_updated_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='messagereply',
            name='message',
        ),
        migrations.RemoveField(
            model_name='messagereply',
            name='reply_message_created_by',
        ),
        migrations.RemoveField(
            model_name='messagereply',
            name='reply_message_updated_by',
        ),
        migrations.RemoveField(
            model_name='message',
            name='message_user',
        ),
        migrations.DeleteModel(
            name='MessageReply',
        ),
        migrations.AddField(
            model_name='message',
            name='message_group',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='messaging.MessageGroup'),
            preserve_default=False,
        ),
    ]
