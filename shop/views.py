from typing import ItemsView
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from .models import *
from .serializers import *

# Create your views here.
@api_view(['GET'])
def item_list(request):
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        items = Item.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(items, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ItemSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({
            'data': serializer.data, 
            'count': paginator.count,
            'numpages' : paginator.num_pages, 
            'nextlink': '/api/items/?page=' + str(nextPage),
            'prevlink': '/api/items/?page=' + str(previousPage)
            })


@api_view(['GET'])
def item_barcode(request, barcode):
    try:
        item = Item.objects.get(barcode=barcode)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ItemSerializer(item,context={'request': request})
        return Response({
            'data': serializer.data
            })


@api_view(['GET'])
def cart_list(request, user):
    try:
        owner = User.objects.get(username=user)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        storage = Storage.objects.get(name='Cart', owner=owner)
        serializer = StorageItemSerializer(storage.items,context={'request': request} ,many=True)

        return Response({
            'data': serializer.data
            })


@api_view(['PUT', 'DELETE'])
def cart_modify(request, user, pk):
    #veryfy if user exists
    try:
        owner = User.objects.get(username=user)
    except User.DoesNotExist:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    #get or create new storage for cart
    try:
        storage = Storage.objects.get(name='Cart', owner=owner)
    except Storage.DoesNotExist:
        storageData = {
            'name': 'Cart',
            'owner': owner.pk
        }
        serializer = StorageSerializer(data=storageData)
        if serializer.is_valid():
            serializer.save()
            storage = Storage.objects.get(name='Cart', owner=owner)
        else:
            return Response(status=status.HTTP_501_NOT_IMPLEMENTED)


    if request.method == 'PUT':
        #pk here ia pk of Item
        item = Item.objects.get(pk=pk)

        try:
            #add +1 qty to existing storage item
            storageItem = StorageItem.objects.get(storage__pk=storage.pk, item=item)
            storageItem.qty += 1
            storageItem.save()
            return Response(status=status.HTTP_200_OK)
        except StorageItem.DoesNotExist:
            storage.items.create(item=item, qty=1)
            return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    if request.method == 'DELETE':
        #pk here is pk of StorageItem
        #item = Item.objects.get(pk=pk)
        storageItem = StorageItem.objects.get(pk=pk)
        storageItem.qty -= 1
        if storageItem.qty == 0:
            storageItem.delete()
        else:
            storageItem.save()
        
        return Response(status=status.HTTP_200_OK)