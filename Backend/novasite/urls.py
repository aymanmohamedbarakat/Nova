"""
URL configuration for novasite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, re_path, include
from novashop.views import get_products, product_detail, index, detail, checkout, ProductList  # ✅ Import Class-Based View
from rest_framework.permissions import AllowAny
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Schema view for Swagger documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Product API",
        default_version='v1',
        description="API documentation for managing products",
    ),
    public=True,
    permission_classes=(AllowAny,),
)

urlpatterns = [
    # Admin Panel
    path('admin/', admin.site.urls),

    # Frontend Pages
    path('', index, name='index'),
    path('<int:id>/', detail, name='detail'),
    path('checkout/', checkout, name='checkout'),

    # API Endpoints
    path('api/products/', ProductList.as_view(), name='api-product-list'),
    path('api/products/all/', get_products, name='api-products'),
    path('api/products/<int:id>/', product_detail, name='api-product-detail'),

    # Swagger API Documentation
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]