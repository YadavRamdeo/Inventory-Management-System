from rest_framework import serializers
from .models import InventoryItem

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = ['id', 'name', 'quantity', 'price', 'description']

# serializers.py
from rest_framework import serializers
from .models import Item, Inventory

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class InventorySerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = Inventory
        fields = '__all__'

    def create(self, validated_data):
        item_data = validated_data.pop('item')
        item, created = Item.objects.get_or_create(**item_data)
        inventory = Inventory.objects.create(item=item, **validated_data)
        return inventory