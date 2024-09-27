import json
from django.db.models import Q

from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.template.loader import render_to_string
from django.views.decorators.cache import cache_page
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from ..models import *
from ..classess.CategoryClass import CategoryClass

@login_required(login_url="/login/")
def TeckdockTreeView(request):
    list = Teckdock.objects.all().order_by('order')

    if (len(list) == 0):
        cat = Teckdock()
        cat.name = 'Drzewo Kategorii'
        cat.left = 1
        cat.right = 2
        cat.level = 1
        cat.active = 1
        cat.user = request.user
        cat.save()
        list = Teckdock.objects.all().order_by('order')

    category_class = CategoryClass()
    json_category_teckdock = category_class.generate_tree_from_db_list(list)

    list_category = Categories.objects.all().order_by('order')

    if (len(list_category) == 0):
        cat = Teckdock()
        cat.name = 'Drzewo Kategorii'
        cat.left = 1
        cat.right = 2
        cat.level = 1
        cat.active = 1
        cat.user = request.user
        cat.save()
        list_category = Categories.objects.all().order_by('order')

    json_category = category_class.generate_tree_from_db_list(list_category)

    return render(request, 'category/teckdock_edit.html', {
        'json_category_teckdock': json_category_teckdock,
        'json_category': json_category
    })