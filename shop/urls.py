from django.conf.urls import url
from django.urls import path

from .views import *

urlpatterns = [
    path('items/', item_list),
    path('items/<int:barcode>', item_barcode),
    path('cart', cart_list),
    path('cart/<int:pk>', cart_modify),
    #url(r'^api/items/$', item_list),
    #url(r'^api/cart/(?P<user>.+)$', cart_list),
    #url(r'^api/cart(?P<user>.+)$', cart_list),
    #url(r'^api/customers/(?P<pk>[0-9]+)$', views.customers_detail)
]