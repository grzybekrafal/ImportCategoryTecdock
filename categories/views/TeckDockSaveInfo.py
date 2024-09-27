import json
from django.db.models import Q
from django.http import JsonResponse

from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.template.loader import render_to_string
from django.views.decorators.cache import cache_page
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from ..models import *
from ..classess.CategoryClass import CategoryClass

@login_required(login_url="/login/")
def TeckDockSaveInfo(request):
    category_info = {}
    if request.method == 'POST':
        category_id = request.POST.get("category_id", "0")
        teckdock_id = request.POST.get("teckdock_id", "0")

        if teckdock_id != 0 and category_id != 0:
            category = CategoryClass()
            category_info = category.save_teckdock_id(category_id, teckdock_id)
            category_info['success'] = 'True'

    return JsonResponse(category_info)


@csrf_exempt
def GetTeckdockInfoById(request):
    category_info = {}
    if request.method == 'POST':
        data = json.loads(request.body)
        ids = data.get('ids', [])

        if ids:
            category = CategoryClass()
            category_info = category.get_teckdock_info_by_id(ids)

    return JsonResponse(category_info, safe=False)