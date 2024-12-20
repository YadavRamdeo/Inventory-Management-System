# Generated by Django 5.1.3 on 2024-11-14 03:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_app', '0008_item_inventory'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='inventory',
            options={'ordering': ['item__name'], 'verbose_name': 'Inventory', 'verbose_name_plural': 'Inventory'},
        ),
        migrations.AlterModelOptions(
            name='item',
            options={'ordering': ['name'], 'verbose_name': 'Item', 'verbose_name_plural': 'Items'},
        ),
        migrations.AlterField(
            model_name='inventory',
            name='current_stock',
            field=models.PositiveIntegerField(help_text='Current stock level of the item'),
        ),
        migrations.AlterField(
            model_name='inventory',
            name='item',
            field=models.ForeignKey(help_text='Reference to the item', on_delete=django.db.models.deletion.CASCADE, to='inventory_app.item'),
        ),
        migrations.AlterField(
            model_name='inventory',
            name='price',
            field=models.DecimalField(decimal_places=2, help_text='Price of the item', max_digits=10),
        ),
        migrations.AlterField(
            model_name='inventory',
            name='total_cumulative_stock',
            field=models.PositiveIntegerField(help_text='Total cumulative stock recorded'),
        ),
        migrations.AlterField(
            model_name='item',
            name='country_of_origin',
            field=models.CharField(help_text='Country where the item was made', max_length=100),
        ),
        migrations.AlterField(
            model_name='item',
            name='name',
            field=models.CharField(help_text='Name of the item', max_length=100),
        ),
        migrations.AlterField(
            model_name='item',
            name='type_of_item',
            field=models.CharField(help_text='Type of the item', max_length=100),
        ),
    ]
