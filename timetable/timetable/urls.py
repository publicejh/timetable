from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('lecture.urls')),
    path('api/v1/lectures/', include('lecture.api.urls')),
    path('api/v1/memos/', include('memo.api.urls')),
]
