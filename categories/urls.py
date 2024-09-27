from django.urls import path, include, re_path
from django.contrib import admin

from .views import *

urlpatterns = [
    path(r'', CategoriesListView.as_view(), name='manage_categories'),
    path(r'edit', CategoriesTreeView, name='edit_category_tree'),
    path(r'teckdock', TeckdockTreeView, name='teckdock'),
    path(r'teckdock_save_info', TeckDockSaveInfo, name='teckdock_save_info'),
    path(r'getTeckdockInfoById', GetTeckdockInfoById, name='getTeckdockInfoById'),


]
