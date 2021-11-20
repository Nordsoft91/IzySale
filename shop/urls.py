from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^api/items/$', item_list),
    #url(r'^api/customers/(?P<pk>[0-9]+)$', views.customers_detail)
]