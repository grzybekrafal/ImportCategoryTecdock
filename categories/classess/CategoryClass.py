import json
from builtins import staticmethod
import copy
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.db.models import Q, F, Count
# from .ProductsOperations import ProductsOperations
from django.db.models import FloatField, IntegerField, BooleanField
from django.db.models.functions import Cast
from ..models import *

class CategoryClass():

    def get_teckdock_info_by_id(self, ids):
        if not ids:
            return []  # Return an empty list if no ids are provided

        # Fetch only the needed fields for the given ids, ordered by 'left'
        items = Teckdock.objects.filter(id__in=ids).order_by('left').values('id', 'category_id', 'category_name',
                                                                            'category_path')
        items = list(items)

        for item in items:
            for key, value in item.items():
                if value is None:
                    item[key] = ''

        return items


    def save_teckdock_id(self, category_id, teckdock_id):

        category = get_object_or_404(Categories, pk=category_id)
        teckdock = get_object_or_404(Teckdock, pk=teckdock_id)

        category.teck_id = teckdock.id
        category.teck_name = teckdock.name
        category.teck_path = self.generate_breadcrumbs_teckdock(teckdock.id)
        category.save()

        teckdock.category_id = category.id
        teckdock.category_name = category.name
        teckdock.category_path = self.generate_breadcrumbs_category(category)
        teckdock.save()

        return {'category_id' : teckdock.category_id, 'category_name': teckdock.category_name, 'category_path': teckdock.category_path}


    def generate_breadcrumbs_teckdock(self, teckdock_id):
        breadcrumbs = Teckdock.objects.filter(id=teckdock_id).order_by('left').values('id', 'name').iterator(
            chunk_size=100
        )
        breadcrumbs_string = ''
        for breadcrumb in breadcrumbs:
            breadcrumbs_string += ' >> ' + breadcrumb['name']

        return breadcrumbs_string

    def generate_breadcrumbs_category(self, category):
        breadcrumbs = Categories.objects.filter(left__lte=category.left, right__gte=category.right).order_by('left').values('id', 'name').iterator(
            chunk_size=100
        )
        breadcrumbs_string = ''
        for breadcrumb in breadcrumbs:
            breadcrumbs_string += ' >> ' + breadcrumb['name']

        return breadcrumbs_string



    def generate_queryset_for_list(self, category, order_by, filter):
        list_exam = None

        if category:
            list_exam = Categories.objects.filter(left__gte=category.left,
                                                right__lte=category.right)
        else:
            list_exam = Categories.objects.all()

        if filter != '':
            list_exam = list_exam.filter(
                Q(name__icontains=filter)
            )

        list_exam = list_exam.order_by(order_by)

        return list_exam.order_by(order_by)


    def generate_tree_from_db_list(self, list_answer=[], category_id=0, **kwargs):
        tree_list = []
        options = {}
        options.update(kwargs)
        list_categorys = list(list_answer)

        left = 0
        right = 0

        if category_id != 0:
            selected_category = Categories.objects.filter(pk=category_id).first()

            if selected_category:
                left = selected_category.left
                right = selected_category.right

        for item in list_categorys:

            if item.left == 1:
                d = item.__dict__
                if '_state' in d: del d['_state']
                if 'create_time' in d: del d['create_time']
                if 'update_time' in d: del d['update_time']
                if 'date_modify' in d: del d['date_modify']
                if 'updated_at' in d: del d['updated_at']
                d['children'] = []
                d['text'] = d['name']
                d['data'] = copy.copy(d)

                d['OPTIONS'] = {}
                d['OPTIONS']['dragging'] = self.get_value_from_options('dragging', options)
                d['OPTIONS']['editable'] = self.get_value_from_options('editable', options)
                d['OPTIONS']['dropable'] = self.get_value_from_options('dropable', options)
                d['OPTIONS']['expanded'] = self.get_value_from_options('expanded', options, True)

                tree_list.append(d)

                self.generate_tree(d, list_categorys, options, left, right)

        return json.dumps(tree_list, sort_keys=True)

    def generate_tree(self, nodeTree, list_categorys, options, left=0, right=0):

        for item in list_categorys:

            if nodeTree['left'] < item.left \
                    and nodeTree['right'] > item.right \
                    and nodeTree['level'] + 1 == item.level:

                d = item.__dict__
                if '_state' in d: del d['_state']
                if 'create_time' in d: del d['create_time']
                if 'update_time' in d: del d['update_time']
                if 'date_modify' in d: del d['date_modify']
                if 'updated_at' in d: del d['updated_at']
                d['text'] = d['name']
                d['data'] = copy.copy(d)

                d['children'] = []
                nodeTree['children'].append(d)
                d['OPTIONS'] = {}
                d['OPTIONS']['dragging'] = self.get_value_from_options('dragging', options)
                d['OPTIONS']['editable'] = self.get_value_from_options('editable', options)
                d['OPTIONS']['dropable'] = self.get_value_from_options('dropable', options)
                if nodeTree['level'] < 0:
                    d['OPTIONS']['expanded'] = self.get_value_from_options('expanded', options, True)
                else:
                    if item.left < left and item.right > right:
                        d['OPTIONS']['expanded'] = True
                    else:
                        d['OPTIONS']['expanded'] = False

                self.generate_tree(d, list_categorys, options, left, right)
    def get_value_from_options(self, key, options, default=False):
        if key in options:
            return options[key]
        else:
            return default
