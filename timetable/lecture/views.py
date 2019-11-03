import requests
from django.shortcuts import render
from lecture.models import Lecture


def home(request):
    lectures = Lecture.objects.all()
    search_text = request.GET.get('lecture-search', '')
    if search_text:
        searched_lectures = requests.get('http://localhost:8000/api/v1/lectures/?search=' + search_text).json()
        searched_ids = []
        for elem in searched_lectures:
            searched_ids.append(elem['id'])
        lectures = lectures.filter(pk__in=searched_ids)

    registered_lectures = Lecture.objects.filter(is_registered=True)
    mon = []
    tue = []
    wed = []
    thu = []
    fri = []

    for registered_lecture in registered_lectures:
        for day in registered_lecture.day.all():
            if day.name == '월':
                mon.append(registered_lecture)
            elif day.name == '화':
                tue.append(registered_lecture)
            elif day.name == '수':
                wed.append(registered_lecture)
            elif day.name == '목':
                thu.append(registered_lecture)
            elif day.name == '금':
                fri.append(registered_lecture)

    return render(request, 'lecture/home.html',
                  {
                      'lectures': lectures,
                      'mon_lectures': mon,
                      'tue_lectures': tue,
                      'wed_lectures': wed,
                      'thu_lectures': thu,
                      'fri_lectures': fri,
                  })
