
from django.shortcuts import render, redirect
from django.core.paginator import Paginator
from django.core.paginator import EmptyPage
from django.core.paginator import PageNotAnInteger
from django.template.loader import render_to_string
from django.views.decorators.cache import cache_page
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from ..classess.CategoryClass import CategoryClass
from ..models import Categories


@method_decorator(login_required, name='dispatch')
class CategoriesListView(ListView):
    model = Categories
    paginate_by = 25
    template_name = "category/manage_categories.html"

    # get_list_or_404
    def get_ordering(self):
        ordering = self.request.GET.get('sort', 'left')
        return ordering

    def get_category_tree(self):
        list = Categories.objects.all().order_by('order')
        if (len(list) == 0):
            cat = Categories()
            cat.name = 'Drzewo Kategorii'
            cat.left = 1
            cat.right = 2
            cat.level = 1
            cat.active = 1
            cat.user = self.request.user
            cat.save()
            list = Categories.objects.all().order_by('order')

        category_class = CategoryClass()
        return category_class.generate_tree_from_db_list(list)

    def get_category(self):
        category_id = self.request.GET.get('category', 0)
        if category_id:
            return Categories.objects.filter(pk=category_id).first()
        else:
            return Categories.objects.filter(level=0).first()

    def get_queryset(self, *args, **kwargs):
        order_by = self.get_ordering()
        category = self.get_category()
        filter = self.request.GET.get('filter', '')
        category_class = CategoryClass()
        list_exam = category_class.generate_queryset_for_list(category, order_by, filter)
        return list_exam

    def get_context_data(self, **kwargs):
        order_by = self.get_ordering()
        context = super(CategoriesListView, self).get_context_data(**kwargs)
        list_exam = self.get_queryset()
        paginator = Paginator(list_exam, self.paginate_by)
        page = self.request.GET.get('page')

        try:
            file_exams = paginator.page(page)
        except PageNotAnInteger:
            file_exams = paginator.page(1)
        except EmptyPage:
            file_exams = paginator.page(paginator.num_pages)

        context['list'] = file_exams
        context['order_by'] = order_by
        context['filter'] = self.request.GET.get('filter', '')
        context['json_category'] = self.get_category_tree()
        context['items_in_category'] = "{}"
        context['category'] = self.request.GET.get('category', 0)
        return context

