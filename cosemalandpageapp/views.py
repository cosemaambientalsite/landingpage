from django.shortcuts import render

def home(request):
    return render(request, 'paginicial.html')# Create your views here.


def sobre_cosema(request):
    return render(request, 'sobre/cosema.html')

def paginicial_nova(request):
    return render(request, 'paginicial_nova.html')
    
def sobre_cosema_nova(request):
    return render(request, 'sobre/cosema_nova.html')