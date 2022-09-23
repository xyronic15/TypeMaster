from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from .models import Typer, Quote, Record

# Typer Serializers

class TyperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Typer
        fields = ('username',)

class CreateTyperSerializer(serializers.ModelSerializer):
    username = serializers.CharField(validators=[])

    class Meta:
        model = Typer
        fields = ('username', 'password', 'email')

class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Typer
        fields = ('username', 'avg_speed', "avg_accuracy")

# Quote Serializers

class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ('text', 'quotee', 'source', 'tags')

# Record Serializers

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('typer', 'created_at', 'speed', 'accuracy')