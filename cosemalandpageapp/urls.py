from django.urls import path
from . import views

urlpatterns = [
    #path('', views.home, name='home'),
    path('sobre/', views.sobre_cosema, name='sobre_cosema'),
    path('', views.paginicial_nova, name='paginicial'),
    path('sobre/cosema-nova/', views.sobre_cosema_nova, name='sobre_cosema_nova'),
]
