# from email.headerregistry import Group
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from api.models import Record

# Register your models here.
Typer = get_user_model()
admin.site.unregister(Group)
admin.site.register(Typer)

class RecordAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at',)
admin.site.register(Record, RecordAdmin)