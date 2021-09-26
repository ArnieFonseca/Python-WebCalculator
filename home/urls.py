from django.urls import path
from django.urls.resolvers import URLPattern
from . import views

# URL configuration
urlpatterns = [
    path('', views.index),
    path('calculate/', views.calculate_operation),
]