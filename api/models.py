from django.db import models
# from django.contrib.postgres.fields import ArrayField
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.

# Typer/Player class and manager
class TyperAccountManager(BaseUserManager):
    
    def create_superuser(self, email, username, password, **other_fields):
    
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser=True')

        return self.create_user(email, username, password, **other_fields)

    def create_user(self, email, username, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide and email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **other_fields)
        user.set_password(password)
        user.save()
        return user


class Typer(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(max_length=150, unique=True)
    # password = models.CharField(max_length=50)
    avg_speed = models.FloatField(default=0.0)
    avg_accuracy = models.FloatField(default=0.0)
    is_staff = models.BooleanField(default=False)

    objects = TyperAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

class Record(models.Model):

    typer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    speed = models.FloatField(default=0.0)
    accuracy = models.FloatField(default=0.0)

class Quote(models.Model):

    text = models.TextField(blank=False)
    quotee = models.CharField(max_length=150)
    source = models.CharField(max_length=50)
    tags = models.TextField()