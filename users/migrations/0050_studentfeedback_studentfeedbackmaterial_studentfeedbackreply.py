# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-06-06 00:33
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0022_courseschedule_schedule_recurring_user'),
        ('users', '0049_auto_20170423_2029'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentFeedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feedback_notes', models.TextField(blank=True, null=True)),
                ('feedback_created', models.DateTimeField(auto_now_add=True)),
                ('feedback_updated', models.DateTimeField(auto_now_add=True)),
                ('feedback_course', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='feedback_scheduled_course', to='schedule.CourseSchedule')),
                ('feedback_created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='feedback_created_user', to=settings.AUTH_USER_MODEL)),
                ('feedback_updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='feedback_updated_user', to=settings.AUTH_USER_MODEL)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student_feedback_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StudentFeedbackMaterial',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('feedback_material', models.FileField(blank=True, null=True, upload_to=users.models.get_upload_file_name)),
                ('feedback_material_created', models.DateTimeField(auto_now_add=True)),
                ('feedback_material_updated', models.DateTimeField(auto_now_add=True)),
                ('feedback_material_created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='feedback_material_created_user', to=settings.AUTH_USER_MODEL)),
                ('feedback_material_updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='feedback_material_updated_user', to=settings.AUTH_USER_MODEL)),
                ('student_feedback', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='feedback', to='users.StudentFeedback')),
            ],
        ),
        migrations.CreateModel(
            name='StudentFeedbackReply',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reply_feedback_notes', models.TextField(blank=True, null=True)),
                ('reply_feedback_created', models.DateTimeField(auto_now_add=True)),
                ('reply_feedback_updated', models.DateTimeField(auto_now_add=True)),
                ('reply_feedback_created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reply_feedback_created_user', to=settings.AUTH_USER_MODEL)),
                ('reply_feedback_updated_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reply_feedback_updated_user', to=settings.AUTH_USER_MODEL)),
                ('student_feedback', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='reply_feedback', to='users.StudentFeedback')),
            ],
        ),
    ]
