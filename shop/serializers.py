from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('pk', 'name')

class ItemSerializer(serializers.ModelSerializer):
    
    name = serializers.ReadOnlyField(source='product.name')
    category_name = serializers.ReadOnlyField(source='product.category.name')
    color = serializers.ReadOnlyField(source='color.name')
    size = serializers.ReadOnlyField(source='size.name')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ('pk', 'barcode', 'price', 'name', 'category_name', 'color', 'size', 'image')

    def get_image(self, item):
        request = self.context.get('request')
        try:
            image_url = item.product.image.url
        except ValueError:
            image_url = '/media/thumbnail.svg'
        return image_url

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ('name', 'owner', 'items')

class StorageItemSerializer(serializers.ModelSerializer):

    name = serializers.ReadOnlyField(source='item.product.name')
    category_name = serializers.ReadOnlyField(source='item.product.category.name')
    color = serializers.ReadOnlyField(source='item.color.name')
    size = serializers.ReadOnlyField(source='item.size.name')
    price = serializers.ReadOnlyField(source='item.price')
    barcode = serializers.ReadOnlyField(source='item.barcode')
    class Meta:
        model = StorageItem
        fields = ('pk', 'item', 'qty', 'barcode', 'price', 'name', 'category_name', 'color', 'size')