from rest_framework import serializers
from .models import InventoryCatalog, PurchaseOrder, SalesOrder, Package, Shipment, InventoryReport, ContactUs

class InventoryCatalogSerializer(serializers.ModelSerializer):
    purchasing_price = serializers.FloatField()
    selling_price = serializers.FloatField()
    updated_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = InventoryCatalog
        fields = [
            'id',
            'name',
            'sku',
            'dimension',
            'purchasing_price',
            'selling_price',
            'on_hand',
            'units',
            'updated_at',
        ]


class PurchaseOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        fields = '__all__'

class SalesOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesOrder
        fields = '__all__'

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'

class ShipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shipment
        fields = '__all__'

class InventoryReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryReport
        fields = '__all__'

class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = '__all__'
