from django.contrib import admin
from .models import Products,Order
# Register your models here.

admin.site.site_header = "Nova"
admin.site.site_title = "Accessories Shop"
admin.site.index_title = "Nova Shop"




class ProductAdmin(admin.ModelAdmin):

    def change_category_to_default(self,request,queryset):
        queryset.update(category="default")

    change_category_to_default.short_description = 'Default Category'
    list_display = ('title','price','category','image',)
    search_fields = ('title','category',)
    actions = ('change_category_to_default',)
    fields = ('title','price','category','description','image',)
    list_editable =('price','category',)


admin.site.register(Products,ProductAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('name', 'items', 'total',)
    search_fields = ('name', 'items',)
    fields = ('name', 'items', 'total',)
    list_editable = ('items','total')  # Allows quick status updates

admin.site.register(Order, OrderAdmin)