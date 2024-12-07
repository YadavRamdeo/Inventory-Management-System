from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    type_of_item = models.CharField(max_length=100)
    country_of_origin = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Inventory(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    current_stock = models.PositiveIntegerField()
    total_cumulative_stock = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.item.name} - {self.current_stock} units"
