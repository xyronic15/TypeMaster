# Generated by Django 4.1.1 on 2022-09-22 00:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_alter_record_created_at"),
    ]

    operations = [
        migrations.AlterField(
            model_name="record",
            name="typer",
            field=models.ForeignKey(
                editable=False,
                on_delete=django.db.models.deletion.CASCADE,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
