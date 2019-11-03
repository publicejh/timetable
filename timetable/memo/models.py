from django.db import models


class Memo(models.Model):
    lecture = models.ForeignKey('lecture.Lecture', on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    content = models.TextField()

    def __str__(self):
        return self.title
