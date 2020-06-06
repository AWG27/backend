
# Create your models here

from django.db import models
from django.contrib.auth.models import User

class Peliculas(models.Model):
      name = models.CharField(max_length=100)
      year = models.IntegerField(null=True)
      director = models.CharField(max_length=100,null=True)
      assessment = models.IntegerField(null=True)
      url = models.TextField()
      imagen = models.TextField()
      description = models.TextField()
      repartos = models.TextField()
      def __str__(self):
          return ("\n id: {}\n name: {}\n year: {}\n director: {}\n assessment: {}\n url: {}\n img: {}\n desc: {}\n repartos: {}\n ".format(
                self.id, self.name,self.year, self.director,self.assessment,self.url , self.imagen,self.description,self.repartos))

class Perfiles(models.Model):
      ADMINISTRADOR = 'admin'
      USUARIO = 'user'
      TYPE_CHOICES = [ (ADMINISTRADOR,'admin'), (USUARIO,'user')]
      user = models.ForeignKey(User,on_delete=models.CASCADE)
      email = models.CharField(max_length=100,null=True)
      tipo = models.CharField(
              max_length=6,
              choices=TYPE_CHOICES,
              default=USUARIO
              )
      def __str__(self):
          return ("\n user: {}\n email: {}\n tipo: {}\n ".format(self.user,self.email,self.tipo))

