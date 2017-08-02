# -*- coding: utf-8 -*-
from django.contrib import admin
from messaging.models import Message, MessageMaterial, MessageReply, StudentFeedback

class MessageMaterialInline(admin.TabularInline):
    model = MessageMaterial
    extra = 0

class MessageReplyInline(admin.TabularInline):
    model = MessageReply
    extra = 0

class MessageAdmin(admin.ModelAdmin):

    class Meta:
        model = Message

    inlines = [
        MessageMaterialInline,
        MessageReplyInline
    ]

    list_display = ('message_created', 'message_created_by',)
    list_filter = ('message_created', 'message_created_by',)
    ordering = ('-message_created',)

admin.site.register(Message, MessageAdmin)

class StudentFeedbackAdmin(admin.ModelAdmin):

    class Meta:
        model = StudentFeedback

    list_display = ('message_created', 'message_created_by', 'course',)
    list_filter = ('message_created', 'message_created_by', 'course',)
    ordering = ('-message_created',)

admin.site.register(StudentFeedback, StudentFeedbackAdmin)