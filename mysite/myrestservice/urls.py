from django.urls import path
from . import views
urlpatterns = [

        path('perfiles',views.put_perfil,name='put_perfil'),
        path('peliculas',views.put_pelicula, name='put_pelicula'),

        path('peliculas/all',views.get_peliculas,name='get_peliculas'),
        path('perfiles/all',views.get_perfiles,name='get_perfiles'),

        path('peliculas/<int:id_pelicula>',views.delete_post_pelicula,name='delete_post_pelicula'),
        path('perfiles/<str:id_perfil>',views.delete_post_perfil,name='delete_post_perfil'),
        
        path('home/peliculas/search/<str:search_name>',views.home_search_peliculas, name='home_search_peliculas'),
        
        ]
