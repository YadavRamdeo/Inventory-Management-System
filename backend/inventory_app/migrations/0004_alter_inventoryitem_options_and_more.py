# Generated by Django 5.1.3 on 2024-11-11 02:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory_app', '0003_auto_20241107_1447'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='inventoryitem',
            options={'ordering': ['name'], 'verbose_name': 'Inventory Item', 'verbose_name_plural': 'Inventory Items'},
        ),
        migrations.AlterField(
            model_name='inventoryitem',
            name='description',
            field=models.TextField(blank=True, help_text='Optional description of the item', null=True),
        ),
        migrations.AlterField(
            model_name='inventoryitem',
            name='name',
            field=models.CharField(help_text='Name of the inventory item', max_length=100),
        ),
        migrations.AlterField(
            model_name='inventoryitem',
            name='price',
            field=models.DecimalField(decimal_places=2, help_text='Price of the item (up to 10 digits, with 2 decimal places)', max_digits=10),
        ),
        migrations.AlterField(
            model_name='inventoryitem',
            name='quantity',
            field=models.IntegerField(help_text='Quantity of the item in stock'),
        ),
    ]
