from operator import mod

from django.db import models
from django.contrib.auth.models import User
from ..models import *
from django.core.cache import cache


class Categories(models.Model):
    id = models.AutoField(primary_key=True)
    left = models.IntegerField()
    right = models.IntegerField()
    level = models.IntegerField()
    active = models.IntegerField(default=1)
    name = models.TextField(max_length=600)
    date_modify = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    old_id = models.IntegerField(null=True, blank=True)
    teck_id = models.IntegerField(null=True, blank=True)
    teck_name = models.TextField(null=True, blank=True, max_length=600)
    teck_tree = models.TextField(null=True, blank=True, max_length=6000)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="categories_to_user")
    order  = models.IntegerField(null=True, blank=True)

    @staticmethod
    def get_name_for_translation():
        return {
            "id": 'Id',
            "name": 'Nazwa',
        }

    def __str__(self):
        return f"{self.id} - {self.name}"

    class Meta:
        verbose_name_plural = "Kategoria"

    def save(self, *args, **kwargs):
        super(Categories, self).save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False):
        super(Categories, self).delete(using, keep_parents)

