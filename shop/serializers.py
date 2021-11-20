from rest_framework import serializers
from .models import Item, Product

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('pk', 'name')

class ItemSerializer(serializers.ModelSerializer):
    
    #product_name = serializers.RelatedField(source='product', read_only=True)
    name = serializers.ReadOnlyField(source='product.name')
    category_name = serializers.ReadOnlyField(source='product.category.name')
    color = serializers.ReadOnlyField(source='color.name')
    size = serializers.ReadOnlyField(source='size.name')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ('pk', 'barcode', 'price', 'qty', 'name', 'category_name', 'color', 'size', 'image')

    def get_image(self, item):
        request = self.context.get('request')
        try:
            image_url = item.product.image.url
        except ValueError:
            image_url = '/media/thumbnail.svg'
        return image_url
