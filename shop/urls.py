from django.conf.urls import url
from django.urls import path

from .views import *

urlpatterns = [
    path('api/items/', item_list),
    path('api/cart/<str:user>', cart_list),
    path('api/cart/<str:user>/<int:pk>', cart_modify),
    #url(r'^api/items/$', item_list),
    #url(r'^api/cart/(?P<user>.+)$', cart_list),
    #url(r'^api/cart(?P<user>.+)$', cart_list),
    #url(r'^api/customers/(?P<pk>[0-9]+)$', views.customers_detail)
]