# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-10-03 22:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0040_auto_20161003_1630'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentEmail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mail_type', models.CharField(blank=True, choices=[('CRE', 'User Created'), ('ACT', 'User Active'), ('UPD', 'User Updated'), ('PRACT', 'User Practice Reminder'), ('SCHED', 'Course Scheduled'), ('CNCL', 'Course Cancelled')], max_length=8, null=True)),
                ('from_email', models.EmailField(blank=True, max_length=254, null=True)),
                ('cc', models.EmailField(blank=True, max_length=254, null=True)),
                ('bcc', models.EmailField(blank=True, max_length=254, null=True)),
                ('subject', models.CharField(blank=True, max_length=250, null=True)),
                ('body', models.TextField(blank=True, null=True)),
                ('footer', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
