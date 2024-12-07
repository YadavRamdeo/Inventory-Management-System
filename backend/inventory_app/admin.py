from django.contrib import admin
from .models import InventoryItem

class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'price', 'description')
    search_fields = ('name', 'description')
    list_filter = ('price', 'quantity')

admin.site.register(InventoryItem, InventoryItemAdmin)
