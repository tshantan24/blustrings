# -*- coding: utf-8 -*-

from django.db import models

# Create your models here.
class Message(models.Model):
    name = models.CharField(max_length=64)
    company = models.CharField(max_length=64)
    email = models.CharField(max_length=120)
    phone = models.CharField(max_length=11)
    # message = models.CharField(max_length=600)

    if company == "":
        company = "Individual"

    def __str__(self):
        return '{}, {}'.format(self.name, self.company)

    # def __str__(self):
    #     return '{} {}: {}'.format(self.firstname, self.lastname, str(self.message)[:40]+'...').encode().strip()