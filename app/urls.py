# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""

from django.urls import path, re_path
from app import views

urlpatterns = [
    path('dashboard', views.index, name='home'),
    path('', views.index, name='home'),
]
