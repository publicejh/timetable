from django.urls import path
from .views import LectureList

urlpatterns = [
    path('', LectureList.as_view()),
]
