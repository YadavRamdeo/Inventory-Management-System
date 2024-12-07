from rest_framework import generics
from .models import Inventory
from .serializers import InventorySerializer
from rest_framework.response import Response

class InventoryListView(generics.ListAPIView):
    serializer_class = InventorySerializer

    def get_queryset(self):
        country = self.request.query_params.get('country', None)
        if country:
            return Inventory.objects.filter(item__country_of_origin=country)
        return Inventory.objects.all()
