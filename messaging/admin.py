# -*- coding: utf-8 -*-
from django.contrib import admin
from messaging.models import MessageGroup, MessageMaterial, Message, StudentFeedback

class MessageMaterialInline(admin.TabularInline):
    model = MessageMaterial
    extra = 0

class MessageInline(admin.TabularInline):
    model = Message
    extra = 0

class MessageAdmin(admin.ModelAdmin):

    class Meta:
        model = Message

    inlines = [
        MessageMaterialInline,
    ]

    list_display = ('message_created', 'message_created_by',)
    list_filter = ('message_created', 'message_created_by',)
    ordering = ('-message_created',)

admin.site.register(Message, MessageAdmin)

class MessageGroupAdmin(admin.ModelAdmin):

    class Meta:
        model = MessageGroup

    inlines = [
        MessageInline,
    ]

    list_display = ('message_group_created', 'message_group_created_by',)
    list_filter = ('message_group_created', 'message_group_created_by',)
    ordering = ('-message_group_created',)

admin.site.register(MessageGroup, MessageGroupAdmin)

# class StudentFeedbackAdmin(admin.ModelAdmin):

#     class Meta:
#         model = StudentFeedback

#     list_display = ('message_created', 'message_created_by', 'course',)
#     list_filter = ('message_created', 'message_created_by', 'course',)
#     ordering = ('-message_created',)

# admin.site.register(StudentFeedback, StudentFeedbackAdmin)