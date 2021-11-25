from django.conf.urls import url
from django.urls import path

from .views import *

urlpatterns = [
    path('items/', item_list),
    path('items/<int:barcode>', item_barcode),
    path('storage/', storage_list),
    path('storage/<str:storageName>', storage_items),
    path('storage/<str:storageName>/<int:pk>', storage_modify),
    #url(r'^api/items/$', item_list),
    #url(r'^api/cart/(?P<user>.+)$', cart_list),
    #url(r'^api/cart(?P<user>.+)$', cart_list),
    #url(r'^api/customers/(?P<pk>[0-9]+)$', views.customers_detail)
]