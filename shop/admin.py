from django.contrib import admin
from django import forms

from .models import *

# Register your models here.


class ColorInline(admin.StackedInline):
    model = Color
    extra = 1

class CategoryAdmin(admin.ModelAdmin):
    inlines = (ColorInline,) 

class ColorAdmin(admin.ModelAdmin):
    pass

class ItemColorChoiceField(forms.ModelChoiceField):
    pass


class ItemAdmin(admin.ModelAdmin):
    
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'color':

            prod = self.model.product
            try:
                parent_id = request.resolver_match.args[0]
                kwargs["queryset"] = Color.objects.filter(some_column=parent_id)

                itemModel = db_field.model
            #Color.objects.filter()
            #ii = db_field.model.objects.get(pk=1)
            #i2 = ii.related_model.color_list.field.related_model.pk
            #i3 = ii.related_model.color_list.events.fields.all()
                return ItemColorChoiceField(Color.objects.filter())
            except IndexError:
                return ItemColorChoiceField(Color.objects.filter())

        return super().formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Item, ItemAdmin)
admin.site.register(Storage)
admin.site.register(Specifications)
admin.site.register(Color)
admin.site.register(Size)