from django.db import models


class Lecture(models.Model):
    code = models.CharField(max_length=32)
    name = models.CharField(max_length=64)
    professor = models.CharField(max_length=32)
    location = models.CharField(max_length=32)
    start_time = models.TimeField()
    end_time = models.TimeField()
    hours = models.IntegerField()
    day = models.ManyToManyField('lecture.DayOfWeek')
    is_registered = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class DayOfWeek(models.Model):
    name = models.CharField(max_length=4, unique=True)

    def __str__(self):
        return self.name
