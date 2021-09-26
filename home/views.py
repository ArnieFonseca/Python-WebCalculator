from typing import Callable
import django
from django.db.models.query import InstanceCheckMeta, QuerySet
from django.http.request import HttpRequest
from django.http.response import HttpResponse
from home.calculations import Calculation 
from django.shortcuts import render
from django.http import JsonResponse
from . import models 
import json

# Create your views here.

def index(request:HttpRequest)->HttpResponse:
    """ 
      Default route for HttpGet 
      It will retrive all operation from the database
    """ 
   
    # Get all operations from the database
    operations:QuerySet = models.Operation.objects.all()

    data:dict = {
        'title': 'Web Calculator',
        'message': 'Using Django Framework',
        'operations': operations,
        'version': django.get_version()
    }
    return render(request, 'index.html', data)

 
def calculate_operation(request:HttpRequest)->JsonResponse: 
    """ 
      Ajax POST 
      Fetch the parameter {first: #, second: #, operation:???}
      and return the result of the opetation (e.g., add,mul ...)
    """ 
    # Instance calculator class
    calc         = Calculation
    # Convert request into Python Dictionary
    data:dict = json.loads(request.body)

    first:int     = int(data['first'])
    second:int    = int(data['second'])
    operation:str = data['operation']

    # Build dynamic function
    fn:Callable   =  eval('calc.' + operation)
    result:int    = fn(x=first, y=second)   

    return JsonResponse({"result": result}, status=200)    
    