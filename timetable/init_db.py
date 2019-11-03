if __name__ == "__main__":
    import os, django

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "timetable.settings")
    django.setup()

    from lecture.initial_db_import import make_data
    make_data()
