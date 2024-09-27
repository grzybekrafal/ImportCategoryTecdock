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
def CategoriesTreeView(request):
    list = Categories.objects.all().order_by('order')

    if (len(list) == 0):
        cat = Categories()
        cat.name = 'Drzewo Kategorii'
        cat.left = 1
        cat.right = 2
        cat.level = 1
        cat.active = 1
        cat.user = request.user
        cat.save()
        list = Categories.objects.all().order_by('order')

    category_class = CategoryClass()
    json_category = category_class.generate_tree_from_db_list(list)

    return render(request, 'category/categories_tree.html', {
        'json_category': json_category
    })