from django.urls import path
from .views import MemoCreate, MemoDelete

urlpatterns = [
    path('', MemoCreate.as_view()),
    path('<pk>', MemoDelete.as_view()),
]
