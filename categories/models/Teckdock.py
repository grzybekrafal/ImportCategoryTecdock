from operator import mod

from django.db import models
from django.contrib.auth.models import User
from ..models import *
from django.core.cache import cache


class Teckdock(models.Model):
    id = models.AutoField(primary_key=True)
    id_parent = models.IntegerField()
    STR_DES_ID = models.IntegerField()
    left = models.IntegerField()
    right = models.IntegerField()
    level = models.IntegerField()
    leaf = models.IntegerField(default=1)
    type = models.TextField(max_length=600)
    name = models.TextField(max_length=600)
    path = models.TextField(max_length=600)
    date_modify = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    order = models.IntegerField(null=True, blank=True)
    category_id = models.IntegerField(null=True, blank=True)
    category_name = models.TextField(max_length=600, null=True, blank=True)
    category_path = models.TextField(max_length=6000,null=True, blank=True)


    @staticmethod
    def get_name_for_translation():
        return {
            "id": 'Id',
            "name": 'Nazwa',
        }

    def __str__(self):
        return f"{self.id} - {self.name}"

    class Meta:
        verbose_name_plural = "Teckdock Kategoria"

    def save(self, *args, **kwargs):
        super(Teckdock, self).save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        super(Teckdock, self).delete(using, keep_parents)

