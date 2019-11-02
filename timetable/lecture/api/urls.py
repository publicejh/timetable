from django.urls import path
from .views import LectureList, LectureRetrieveUpdate

urlpatterns = [
    path('', LectureList.as_view()),
    path('<pk>', LectureRetrieveUpdate.as_view()),
]
