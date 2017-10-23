# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-06-06 02:50
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0051_auto_20170605_1952'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentFeedbackMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feedback_message', models.TextField(blank=True, null=True)),
                ('feedback_message_created', models.DateTimeField(auto_now_add=True)),
                ('feedback_message_updated', models.DateTimeField(auto_now=True)),
                ('feedback_message_created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='feedback_message_created_user', to=settings.AUTH_USER_MODEL)),
                ('feedback_message_updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='feedback_message_updated_user', to=settings.AUTH_USER_MODEL)),
                ('student_feedback', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message_feedback', to='users.StudentFeedback')),
            ],
        ),
        migrations.RemoveField(
            model_name='studentfeedbackreply',
            name='reply_feedback_created_by',
        ),
        migrations.RemoveField(
            model_name='studentfeedbackreply',
            name='reply_feedback_updated_by',
        ),
        migrations.RemoveField(
            model_name='studentfeedbackreply',
            name='student_feedback',
        ),
        migrations.DeleteModel(
            name='StudentFeedbackReply',
        ),
    ]