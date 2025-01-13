from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import InventoryItem, Inventory
from .serializers import InventoryItemSerializer, InventorySerializer


# List and create Inventory Items
class InventoryItemListCreateView(generics.ListCreateAPIView):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer

    def perform_create(self, serializer):
        # Save the new inventory item
        serializer.save()


# Retrieve, update, and delete a specific Inventory Item
class InventoryItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer


# List Inventory Items with optional filtering
class InventoryListView(APIView):
    def get(self, request):
        # Filter by country if the 'country' query parameter is provided
        country = request.query_params.get('country', None)
        if country:
            queryset = Inventory.objects.filter(item__country_of_origin=country)
        else:
            queryset = Inventory.objects.all()

        serializer = InventorySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Handle the creation of a new Inventory object
        serializer = InventorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Data created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Logout View to handle token blacklisting
class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
            return Response({"error": "Refresh token not provided"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
