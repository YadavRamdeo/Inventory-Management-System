from django.urls import path
from .views import InventoryItemListCreateView, InventoryItemDetailView, InventoryListView

urlpatterns = [
    path('items/', InventoryItemListCreateView.as_view(), name='inventoryitem-list-create'),
    path('items/<int:pk>/', InventoryItemDetailView.as_view(), name='inventoryitem-detail'),
    path('inventory/', InventoryListView.as_view(), name='inventory-list'),
]
