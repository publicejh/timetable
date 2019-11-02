from django.urls import path
from .views import MemoCreate

urlpatterns = [
    path('', MemoCreate.as_view()),
]
