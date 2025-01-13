# shiporders/admin.py

from django.contrib import admin
from .models import InventoryCatalog

# Register your model in the admin panel
admin.site.register(InventoryCatalog)
