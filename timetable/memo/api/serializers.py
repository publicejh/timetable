from rest_framework import serializers
from memo.models import Memo


class MemoSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Memo
