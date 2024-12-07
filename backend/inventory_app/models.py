from django.db import models

class InventoryItem(models.Model):
    name = models.CharField(max_length=100, help_text="Name of the inventory item")
    quantity = models.IntegerField(help_text="Quantity of the item in stock")
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price of the item")
    description = models.TextField(blank=True, null=True, help_text="Optional description of the item")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Inventory Item"
        verbose_name_plural = "Inventory Items"
        ordering = ['name']


class Item(models.Model):
    name = models.CharField(max_length=100, help_text="Name of the item")
    type_of_item = models.CharField(max_length=100, help_text="Type of the item")
    country_of_origin = models.CharField(max_length=100, help_text="Country where the item was made")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Items"
        ordering = ['name']


class Inventory(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, help_text="Reference to the item")
    current_stock = models.PositiveIntegerField(help_text="Current stock level of the item")
    total_cumulative_stock = models.PositiveIntegerField(help_text="Total cumulative stock recorded")
    price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price of the item")

    def __str__(self):
        return f"{self.item.name} - {self.current_stock} units"

    class Meta:
        verbose_name = "Inventory"
        verbose_name_plural = "Inventory"
        ordering = ['item__name']
