# Generated by Django 4.1.1 on 2022-09-22 00:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_alter_record_typer"),
    ]

    operations = [
        migrations.AlterField(
            model_name="record",
            name="typer",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
