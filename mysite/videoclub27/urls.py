from django.urls import path
from . import views
urlpatterns = [
         path( 'login' , views.login, name='login' ),
         path( 'home' , views.home, name='home' ),
         path('administrator', views.administrator, name='administrator'),
         path( 'logout' , views.logout_, name='logout_' ),
         path( 'peliculas/<int:id_peli>' , views.peliculas, name='peliculas' )
  ]
