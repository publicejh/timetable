from rest_framework import generics, filters
from lecture.models import Lecture
from .serializers import LectureSerializer


class LectureList(generics.ListAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'code', 'professor')


class LectureRetrieveUpdate(generics.RetrieveUpdateAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
