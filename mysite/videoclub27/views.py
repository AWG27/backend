from django.shortcuts import render

from django.http import HttpResponse
from django.template import loader

from django.contrib.auth import authenticate
from django.contrib.auth import login as login_django
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required

from django.shortcuts import redirect
from django.urls import reverse
#def login(request):
#    template = loader.get_template("videoclub27/page-login.html")
#    context = {}
#    return HttpResponse(template.render(context,request))

@login_required(login_url='/videoclub27/login')
def administrator(request):
    context={}
    context['username'] = request.user
    if request.user.has_perm("myrestservice.add_perfiles"):
        template = loader.get_template("videoclub27/administrator.html")
        return HttpResponse(template.render(context,request))
    else:
      return redirect(reverse('home'),context)

def login(request):
     context = {}
     if request.method == 'GET':
        template = loader.get_template("videoclub27/page-login.html")
        return HttpResponse(template.render(context,request))
     elif request.method == 'POST':
               name = request.POST['name']
               password = request.POST['password']
               if(name is not None and password is not None ):
                   if len(name) > 0 and len(password) > 0:
                      print("pasa la condicion \n")
                      user = authenticate(request,
                                          username=name,
                                           password=password)
                      if user is not None:
                          login_django(request,user)
                          context['username'] = name
                          return redirect(reverse('home'),context)
                                      
                      else:
                          print("no logea usuario '" + str(user) +"'")
        
                   else:
                       print("no pasa")
               context['response'] = "NOT SUCCESS"
               return render(request, "videoclub27/page-login.html", context)

@login_required(login_url='/videoclub27/login')
def home(request):
    context = {}
    if request.method == 'GET':
      context['username'] = request.user
      context['admin'] = False

      if request.user.has_perm("myrestservice.add_perfiles"):
           context['admin'] = True
           
      template = loader.get_template("videoclub27/page-home.html")
      return HttpResponse(template.render(context,request))
    else:
      return redirect(reverse('login'),context)
      
@login_required(login_url='/videoclub27/login')     
def logout_(request):
    context = {}
    if request.method == 'POST':
          logout(request)
          template = loader.get_template("videoclub27/page-login.html")
          return HttpResponse(template.render(context,request))
    return redirect(reverse('login'),context)
      

@login_required(login_url='/videoclub27/login')     
def peliculas(request,id_peli):
    context = {}
    if request.method == 'GET':
          context['username'] = request.user
          context['admin'] = False
          if request.user.has_perm("myrestservice.add_perfiles"):
           context['admin'] = True
          template = loader.get_template("videoclub27/page-peli.html")
          return HttpResponse(template.render(context,request))
    return redirect(reverse('home'),context)