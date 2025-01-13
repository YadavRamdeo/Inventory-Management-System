from rest_framework import viewsets
from .models import InventoryCatalog, PurchaseOrder, SalesOrder, Package, Shipment, InventoryReport, ContactUs
from .serializers import InventoryCatalogSerializer, PurchaseOrderSerializer, SalesOrderSerializer, PackageSerializer, ShipmentSerializer, InventoryReportSerializer, ContactUsSerializer

class InventoryCatalogViewSet(viewsets.ModelViewSet):
    queryset = InventoryCatalog.objects.all()
    serializer_class = InventoryCatalogSerializer

class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer

class SalesOrderViewSet(viewsets.ModelViewSet):
    queryset = SalesOrder.objects.all()
    serializer_class = SalesOrderSerializer

class PackageViewSet(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class ShipmentViewSet(viewsets.ModelViewSet):
    queryset = Shipment.objects.all()
    serializer_class = ShipmentSerializer

class InventoryReportViewSet(viewsets.ModelViewSet):
    queryset = InventoryReport.objects.all()
    serializer_class = InventoryReportSerializer

class ContactUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer
