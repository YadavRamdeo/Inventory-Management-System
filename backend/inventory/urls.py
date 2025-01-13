from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from inventory_app.views import LogoutView  # Import from your app
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Simple view for the root path
def home_view(request):
    message = """
    <h1>Welcome to the Inventory Management System</h1>
    <p>To Check all API details, click link: 
    <a href="/api/" target="_blank">http://127.0.0.1:8000/api/</a></p>
    """
    return HttpResponse(message)

# URL patterns for the project
urlpatterns = [
    path('', home_view, name='home'),
    path('api/admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/logout/', LogoutView.as_view(), name='custom_token_blacklist'),

    path('api/', include('inventory_app.urls')),  
    path('api/', include('shiporders.urls')),


]
