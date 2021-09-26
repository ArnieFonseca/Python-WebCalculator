from django.db import models

# Create your models here.
class Operation(models.Model):

    oper =  models.CharField(max_length=3,unique=True)
    description = models.CharField(max_length=15)

    def __str__(self) -> str:
        return self.description
