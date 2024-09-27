from django.contrib import admin
from .models import Categories
from django.db import models

@admin.register(Categories)
class CategoriesAdmin(admin.ModelAdmin):
    search_fields = ['left', 'right', 'level', 'active', 'name',  'user']
    list_display = ['left', 'right', 'level', 'active', 'name',   'user']
    list_filter = ['left', 'right', 'level', 'active', 'name', 'user']
