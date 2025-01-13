from django.db import models

class InventoryCatalog(models.Model):
    name = models.CharField(max_length=255)
    sku = models.CharField(max_length=100, unique=True)
    dimension = models.CharField(max_length=100)
    purchasing_price = models.DecimalField(max_digits=10, decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    on_hand = models.PositiveIntegerField()
    units = models.CharField(max_length=50)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Purchase Order Model
class PurchaseOrder(models.Model):
    supplier = models.CharField(max_length=255)
    billing_address = models.CharField(max_length=255)
    shipping_address = models.CharField(max_length=255)
    shipping_method = models.CharField(max_length=100)
    preferred_shipping_date = models.DateTimeField()
    item = models.ForeignKey(InventoryCatalog, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Purchase Order #{self.id}"

# Sales Order Model
class SalesOrder(models.Model):
    customer = models.CharField(max_length=255)
    contact_person = models.CharField(max_length=255)
    shipping_address = models.CharField(max_length=255)
    billing_address = models.CharField(max_length=255)
    shipping_method = models.CharField(max_length=100)
    preferred_shipping_date = models.DateTimeField()
    payment_terms = models.CharField(max_length=50)
    order_total = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Sales Order #{self.id}"

# Package Model
class Package(models.Model):
    sales_order = models.ForeignKey(SalesOrder, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    weight = models.DecimalField(max_digits=10, decimal_places=2)
    shipping_dimensions = models.CharField(max_length=100)

    def __str__(self):
        return f"Package #{self.id}"

# Shipment Model
class Shipment(models.Model):
    tracking_number = models.CharField(max_length=100, unique=True)
    shipping_method = models.CharField(max_length=100)
    customer = models.CharField(max_length=255)
    associated_package = models.ForeignKey(Package, on_delete=models.CASCADE)

    def __str__(self):
        return f"Shipment Order #{self.id}"

# Report Model
class InventoryReport(models.Model):
    report_type = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.report_type} Report ({self.start_date} to {self.end_date})"

# Contact Us Model
class ContactUs(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
