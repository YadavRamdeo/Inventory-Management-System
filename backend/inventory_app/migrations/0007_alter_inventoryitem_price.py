# Generated by Django 5.1.3 on 2024-11-13 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_app', '0006_delete_inventory_delete_item'),
    ]

    operations = [
        migrations.AlterField(
            model_name='inventoryitem',
            name='price',
            field=models.DecimalField(decimal_places=2, help_text='Price of the item', max_digits=10),
        ),
    ]
