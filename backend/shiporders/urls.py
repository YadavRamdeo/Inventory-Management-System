
# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InventoryCatalogViewSet, PurchaseOrderViewSet, SalesOrderViewSet, PackageViewSet, ShipmentViewSet, InventoryReportViewSet, ContactUsViewSet

router = DefaultRouter()
router.register(r'inventory-catalog', InventoryCatalogViewSet)
router.register(r'purchase-orders', PurchaseOrderViewSet)
router.register(r'sales-orders', SalesOrderViewSet)
router.register(r'packages', PackageViewSet)
router.register(r'shipments', ShipmentViewSet)
router.register(r'reports', InventoryReportViewSet)
router.register(r'contact-us', ContactUsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
