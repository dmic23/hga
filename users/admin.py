from django.contrib import admin
from users.models import User

class UserAdmin(admin.ModelAdmin):

    list_display = ('username', 'first_name', 'last_name', 'user_created',)
    list_filter = ('username', 'first_name', 'last_name', 'user_created',)
    ordering = ('-user_created',)
    filter_horizontal = ()

admin.site.register(User, UserAdmin)
