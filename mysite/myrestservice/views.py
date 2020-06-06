from django.shortcuts import render

# Create your views here.


from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.request import Request
from rest_framework.response import Response

from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.conf import settings

from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login

from myrestservice.models import *
from myrestservice.serializers import *

from django.contrib.auth.models import Permission

import json as dj_json
######################################
# peliculas
######################################

@api_view(['PUT'])
def put_pelicula(request):
    serlz = PeliculasSerializer(data=request.data)
    #print(str(request.data))
    if request.method == 'PUT':
        if request.user.is_authenticated:
            user = request.user
            if user.has_perm('myrestservice.add_peliculas'):
                #print("nombre " + str(request.user))
                
                if serlz.is_valid():
                    new_obj = serlz.save()
                    #print(serlz.data)
                    return Response(serlz.data,status=status.HTTP_201_CREATED)
                else:
                    return Response(serlz.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
                return Response(status=status.HTTP_403_FORBIDDEN)
    else:            
         return Response(serlz.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def get_peliculas(request):
     queryset = Peliculas.objects.all()
     if len(queryset) > 0:
         serializer = PeliculasSerializer(queryset, many=True)
         return  Response(serializer.data)
     else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE','POST','GET'])
def delete_post_pelicula(request,id_pelicula):
 if request.method == 'GET':
    pelicula = Peliculas.objects.filter(id=id_pelicula)
    if len(pelicula) > 0:
        serializer = PeliculasSerializer(pelicula,many=True)
        return  Response(serializer.data)
    
 if request.method == 'DELETE':
     #print("[delete] el usuario de la sesion es: '" + str(request.user) + "'")
     if request.user.is_authenticated:
         user = request.user
         #print("[delete] el usuario " + str(request.user)+ "se ha autenticado")
         if user.has_perm('myrestservice.delete_peliculas'):
            #print("[delete] user: '"+str(user)+ " tiene permisos de eliminacion")
            pelicula = Peliculas.objects.filter(id=id_pelicula)
            if len(pelicula) > 0:
                pelicula.delete()
                #print("[delete] se ha elimado la pelicula: id=" +str(id_pelicula) )
                return Response(status=status.HTTP_200_OK)
         #print("[delete] user: '"+str(user)+ " NO tiene permisos de eliminacion")
     #print("[delete] no se ha authenticado")
     return Response(status=status.HTTP_204_NO_CONTENT)

 if request.method == 'POST':
     #print("[post] usuario: " + str(request.user) )
     if request.user.is_authenticated:
         user = request.user
         #print("[post] el usuario " + str(request.user)+ "se ha autenticado")
         if user.has_perm('myrestservice.change_peliculas'):
             #print("[post] user: '"+str(user)+ " tiene permisos de cambios")
             pelicula = Peliculas.objects.filter(id=id_pelicula)
             
             #print(str(request.data))
             if len(pelicula) > 0:
                if request.data['name'] != '':
                   pelicula.update(name=request.data['name'])
                if request.data['year'] != '':
                   pelicula.update(year=request.data['year'])
                if request.data['director'] != '':
                    pelicula.update(director=request.data['director'])
                if request.data['url'] != '':
                    pelicula.update(url=request.data['url'])
                if request.data['assessment'] != '':
                    pelicula.update(assessment=request.data['assessment'])
                if request.data['imagen'] != '':
                    pelicula.update(imagen=request.data['imagen'])
                if request.data['description'] != '' and request.data['description'] != ' ':
                    pelicula.update(description=request.data['description'])
             else:
                return Response(status=status.HTTP_204_NO_CONTENT)
                #print("[post] No es valido")

     return Response(request.data,status=status.HTTP_202_ACCEPTED)
     
@api_view(['GET'])
def home_search_peliculas(request,search_name):
        
    busqueda_pelis = Peliculas.objects.filter(name__contains=search_name)
    serlz = PeliculasSerializer(busqueda_pelis,many=True)
    if len(busqueda_pelis) > 0:
        #print("[get] search data: " + str(serlz.data))
        return Response(serlz.data,status=status.HTTP_200_OK)
    return Response(status=status.HTTP_204_NO_CONTENT)

######################################
# usuarios
######################################

@api_view(['PUT'])
def put_perfil(request): 
    #print("[put]")
    if request.method == 'PUT':
        if request.user.is_authenticated:
            user = request.user
            if user.has_perm('myrestservice.add_perfiles'):
                #print("nombre " + str(request.user))
                serlz = PerfilesSerializer(data=request.data)
                if serlz.is_valid():
                    
                    # agrega el usuario en el model de User
                    new_user = User.objects.create_user(username=request.data['name'])
                    new_user.set_password(request.data['password']);
                    new_user.save()
                    
                    new_user_filter = User.objects.filter(username=request.data['name'])
                    #print("[put] new_user: " + str(new_user_filter))
                    # agrega permisos al usuario
                    if len(new_user_filter) == 1:
                        user1 = User.objects.get(username=request.data['name'])
                        perfil1 = Perfiles.objects.create(
                                                          user=user1,
                                                          email=request.data['email'],
                                                          tipo=request.data['tipo']
                                                          ) 
                        perfil1.save()
                        if request.data['tipo'] == "admin":
                        
                            #print("[put] new user: tipo admin")
                            p1 = Permission.objects.get(codename='add_peliculas')
                            p2 = Permission.objects.get(codename='change_peliculas')
                            p3 = Permission.objects.get(codename='delete_peliculas')
                            new_user.user_permissions.add(p1,p2,p3)
                            p4 = Permission.objects.get(codename='add_perfiles')
                            p5 = Permission.objects.get(codename='change_perfiles')
                            p6 = Permission.objects.get(codename='delete_perfiles')
                            new_user.user_permissions.add(p4,p5,p6)
                      
                        return Response(serlz.data,status=status.HTTP_201_CREATED)
                    
                else:
                    return Response(serlz.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_403_FORBIDDEN)
    else:            
         return Response(serlz.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def get_perfiles(request):
    queryset = Perfiles.objects.all()
    if len(queryset) > 0:
       # serializer = UsuariosSerializer(objs[0])
       serializer =PerfilesSerializer(queryset, many=True)
       return  Response(serializer.data,status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
        
@api_view(['DELETE','POST'])
def delete_post_perfil(request,id_perfil):
 if request.method == 'DELETE':
     #print("[delete] el usuario de la sesion es: '" + str(request.user) + "'")
     if request.user.is_authenticated:
         user = request.user
         #print("[delete] el usuario " + str(request.user)+ "se ha autenticado")
         if user.has_perm('myrestservice.delete_perfiles'):
            #print("[delete] user: '"+str(user)+ " tiene permisos de eliminacion")
            user1 = User.objects.get(username=id_perfil)
            perfil = Perfiles.objects.filter(user=user1)
            if len(perfil) > 0:
                user1.delete()
                #print("[delete] se ha elimado el usuario: id=" +str(id_perfil) )
                return Response(status=status.HTTP_200_OK)
         #print("[delete] user: '"+str(user)+ " NO tiene permisos de eliminacion")
     #print("[delete] no se ha authenticado")
     return Response(status=status.HTTP_204_NO_CONTENT)

 if request.method == 'POST':
    #print("[post] usuario: " + str(request.user) )
    if request.user.is_authenticated:
         user = request.user
         #print("[post] el usuario " + str(request.user)+ "se ha autenticado")
         if user.has_perm('myrestservice.change_perfiles'):
            #print("[post] user: '"+str(user)+ " tiene permisos de cambios")
            #print("[post]" + str(request.data) + "id_perfil: "+ id_perfil)
            serlz = PerfilesSerializer(data=request.data)
            if serlz.is_valid():
                #print("[post] json data:" + str(request.data)+"\n user: " + str(request.user) )
                user1 = User.objects.get(username=id_perfil)
                #print("[post] llega user1")
                
                perfil1 = Perfiles.objects.get(user=user1)
                #print("[post] llega perfil")
             
                if request.data['name'] != '':
                    user1.username=request.data['name']
                    user1.save()
                if request.data['email'] != '':
                    perfil1.email=request.data['email']
                    perfil1.save()
                if request.data['tipo'] != '':
                    perfil1.tipo=request.data['tipo']
                    perfil1.save()
                if request.data['password'] != '':
                    user1.set_password(request.data['password'])
                    user1.save()
                    
                new_user = User.objects.get(username=user1.username)
                if request.data['tipo'] == "admin":
                
                    #print("[put] new user: tipo admin")
                    p1 = Permission.objects.get(codename='add_peliculas')
                    p2 = Permission.objects.get(codename='change_peliculas')
                    p3 = Permission.objects.get(codename='delete_peliculas')
                    new_user.user_permissions.add(p1,p2,p3)
                    p4 = Permission.objects.get(codename='add_perfiles')
                    p5 = Permission.objects.get(codename='change_perfiles')
                    p6 = Permission.objects.get(codename='delete_perfiles')
                    new_user.user_permissions.add(p4,p5,p6)
                else:
                    new_user.user_permissions.clear()
                    
                    
                    
                #data_obj = Perfiles.objects.get(user=user1)
                #serlz = PerfilesSerializer(data_obj)
                return Response(serlz.data,status=status.HTTP_201_CREATED)
                    
           #else:
                #print("serlz NO valido" )
    return Response(request.data,status=status.HTTP_204_NO_CONTENT)
