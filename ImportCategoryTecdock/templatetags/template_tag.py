import os
import base64

from django import template

register = template.Library()
from django.template import defaultfilters

@register.simple_tag()
def debug_object_dump(var):
    return vars(var)

@register.filter(name='is_superadmin')
def is_superadmin(user):
    return False

@register.filter(name='is_courier')
def is_courier(user):
    return False

@register.filter(name='is_customer')
def is_customer(user):
    return False

@register.filter(name='is_worker')
def is_worker(user):
    return False
