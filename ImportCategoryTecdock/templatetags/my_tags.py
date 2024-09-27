import os
import base64

from django import template



register = template.Library()
from django.template import defaultfilters

class IncrementVarNode(template.Node):

    def __init__(self, var_name):
        self.var_name = var_name

    def render(self,context):
        value = context[self.var_name]
        context[self.var_name] = value + 1
        return u""

@register.filter
def increment_var(parser, token):
    print('increment_var')
    parts = token.split_contents()
    if len(parts) < 2:
        raise template.TemplateSyntaxError("'increment' tag must be of the form:  {% increment <var_name> %}")
    inc_var = IncrementVarNode(parts[1])
    return inc_var

register.tag('increment', increment_var)
@register.filter(name='image_exist')
def image_exist(images, id):
    for i in images:
        if i.product.id == id:
            return True
    return False

@register.filter
def classname(obj):
    return obj.__class__.__name__

@register.simple_tag()
def update_variable(value):
    return value

@register.simple_tag(name='dump')
def dump(var):
    return vars(var)

@register.simple_tag()
def debug_object_dump(var):
    return vars(var)


@register.filter(name='create_sort_url')
def create_sort_url(order_by, request):
    try:
        sort = request.GET.get('sort')
        if sort:
            new_url = str(str(request.get_full_path()).replace("sort="+sort, "sort="+order_by))
        else:
            if str(request.get_full_path()).find('?') >= 1:
                new_url = str(str(request.get_full_path()) + "&sort="+order_by)
            else:
                new_url = str(str(request.get_full_path()) + "?sort=" + order_by)

        return str(new_url)
    except ValueError:
        return str(request.get_full_path())


@register.filter(name='create_page_url')
def create_page_url(page, request):
    try:
        p = request.GET.get('page')
        if p:
            new_url = str(str(request.get_full_path()).replace("page="+str(p), "page="+str(page)))
        else:
            if "?" in str(request.get_full_path()):
                new_url = str(str(request.get_full_path()) + "&page="+str(page))
            else:
                new_url = str(str(request.get_full_path()) + "?page=" + str(page))

        return str(new_url)
    except ValueError:
        return str(request.get_full_path())


@register.filter(name='get_value_from_array')
def get_value_from_array(objs, key):
    if str(key) in objs:
        return objs[str(key)]
    return ''



@register.filter(name='replaceChar')
def replaceChar(value, arg):
    """
    Replacing filter
    Use `{{ "aaa"|replace:"a|b" }}`
    """
    if len(arg.split('|')) != 2:
        return value

    what, to = arg.split('|')
    return str(value).replace(what, to)



@register.filter(name='cast_to_float')
def cast_to_float(value):
    try:
        numb = float(value)
        return str(numb).replace(',', '.')
    except Exception as e:
        return ''

@register.filter(name='generate_translate_for_filters')
def generate_translate_for_filters(item_list=''):
    try:
        html = ''
        items = str(item_list).split('||')

        for i in items:
            t = str(i).split('_|_')

            if t[0] != '':
                answer = ''
                for tt in t:
                    if answer == "":
                        answer = f"<b>{tt}</b>:"
                    else:
                        if tt != "":
                            answer += f"<span class='text-success'><b>{tt}</b></span>"
                        else:
                            answer += f"<span class='text-danger'><b>...</b></span>"

                html += f"<div class='col-3'>{answer}</div><br>"
        return html
    except ValueError:
        return ''
