from rest_framework import serializers
from lecture.models import Lecture


class LectureSerializer(serializers.ModelSerializer):

    def validate_is_registered(self, data):

        if data == False:
            return data

        selected_lecture_start_time = self.instance.start_time
        selected_lecture_end_time = self.instance.end_time
        selected_lecture_day = self.instance.day.all()

        registered_lectures = Lecture.objects.filter(is_registered=True)

        for registered_lecture in registered_lectures:
            start_time = registered_lecture.start_time
            end_time = registered_lecture.end_time
            for day in registered_lecture.day.all():
                for s_day in selected_lecture_day:
                    if day == s_day:
                        if not(selected_lecture_end_time <= start_time or end_time <= selected_lecture_start_time):
                            raise serializers.ValidationError('겹치는 과목이 있습니다!')

        return data

    class Meta:
        fields = '__all__'
        model = Lecture
