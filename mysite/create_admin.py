
from django.contrib.auth import authenticate
user = authenticate(
        username='asudara',
        password='asudarapassword' )
if(user.is_authenticated):
    print(str(user) + 'se ha autenticado')
else:
    print(str(user) + 'NO se ha autenticado')

from django.contrib.auth.models import Permission
perm_add_peliculas = Permission.objects.get(codename='change_peliculas')

user.user_permissions.add(perm_add_peliculas)
