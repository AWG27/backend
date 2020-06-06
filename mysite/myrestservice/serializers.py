
from rest_framework import serializers
from myrestservice.models import Peliculas
from myrestservice.models import Perfiles

class PeliculasSerializer(serializers.ModelSerializer):
     class Meta:
          model = Peliculas
          fields = ('id','name','year','director','assessment','url','imagen','description','repartos')
class PerfilesSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user')
    class Meta:
          model = Perfiles
          fields = ('name','email','tipo')

    
