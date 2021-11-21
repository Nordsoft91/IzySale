from django.db import models
from django.db.models.base import Model
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType

User = get_user_model()

# Create your models here.

class Color(models.Model):

    name = models.CharField(max_length=255, verbose_name='Значение цвета')

    def __str__(self) -> str:
        return self.name


class Size(models.Model):

    name = models.CharField(max_length=255, verbose_name='Значение размера')

    def __str__(self) -> str:
        return self.name


class Category(models.Model):

    name = models.CharField(max_length=255, verbose_name='имя категории')
    slug = models.SlugField(unique=True)

    def __str__(self) -> str:
        return self.name


class Product(models.Model):

    category = models.ForeignKey(Category, verbose_name='Категория', on_delete=models.CASCADE)
    name = models.CharField(max_length=255, verbose_name='Наименование')
    slug = models.SlugField(unique=True)
    image = models.ImageField(verbose_name='Изображение', blank=True, null=True)
    description = models.TextField(verbose_name='Описание', blank=True, default='')
    color_list = models.ManyToManyField(Color, blank=True)
    size_list = models.ManyToManyField(Size, blank=True)

    def __str__(self) -> str:
        return f"{self.category.name} {self.name}"


class Item(models.Model):

    product = models.ForeignKey(Product, verbose_name='Продукт', on_delete=models.CASCADE)
    color = models.ForeignKey(Color, verbose_name='Цвет', on_delete=models.CASCADE, related_name='related_color', null=True)
    size = models.ForeignKey(Size, verbose_name='Размер', on_delete=models.CASCADE, related_name='related_size', null=True)
    price = models.DecimalField(max_digits=9, decimal_places=2, verbose_name='Цена')
    barcode = models.PositiveBigIntegerField(default=1, verbose_name='Штрих код', unique=True)

    def __str__(self) -> str:
        return f"{self.product.category.name} {self.product.name} {self.color.name} {self.size.name}"


class StorageItem(models.Model):
    
    item = models.ForeignKey(Item, verbose_name='Экземпляр', on_delete=models.CASCADE)
    qty = models.PositiveIntegerField(default=1, verbose_name='Количество')

    def __str__(self) -> str:
        return f"{self.item.product.category.name} {self.item.product.name} {self.item.color.name} {self.item.size.name} кол-во {self.qty}"

class Storage(models.Model):

    name = models.CharField(max_length=255, verbose_name='Хранилище')
    items = models.ManyToManyField(StorageItem, blank=True)
    owner = models.ForeignKey(User, verbose_name='Владелец', on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return f"{self.name} for user {self.owner.username}"


    