# Generated by Django 4.1.1 on 2022-09-29 03:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0006_quote"),
    ]

    operations = [
        migrations.AlterField(
            model_name="quote", name="source", field=models.CharField(max_length=150),
        ),
    ]
