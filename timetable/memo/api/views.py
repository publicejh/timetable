from rest_framework import generics
from memo.models import Memo
from .serializers import MemoSerializer


class MemoCreate(generics.CreateAPIView):
    queryset = Memo.objects.all()
    serializer_class = MemoSerializer
