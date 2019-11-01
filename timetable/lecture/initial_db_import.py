RAW_DATA = '''PG1807-01	WorldWideEnglish1	김영순	A동403	10	12	월금
PG1807-02	커뮤니케이션영어1	이영희	A동203	9	10	월
PG1807-03	대학수학1	박정희	B동102	13	15	화
PG1807-04	TOEIC1	최옥순	A동302	15	16	수
PG1807-05	C프로그래밍	김미경	C동104	17	18	목
PG1807-06	논리회로	이명숙	C동501	9	10	금
PG1807-07	컴퓨터공학세미나	박경숙	B동608	10	11	화수
PG1807-08	자료구조	최순옥	B동607	11	12	목금
PG1807-09	컴퓨터구조	최순옥	C동304	10	12	월목
PG1807-10	C++프로그래밍	김현숙	B동610	9	10	화금
PG1807-11	아두이노프로그래밍	이미영	B동204	13	15	월
PG1807-12	데이터베이스시스템	박미숙	B동312	15	16	월
PG1807-13	컴퓨터그래픽스	최경희	C동505	17	18	금
PG1807-14	운영체제	최경희	C동506	9	10	월화
PG1807-15	JAVA프로그래밍	김영미	B동409	10	11	월금
PG1807-16	컴퓨터네트워크	이지영	B동101	11	12	화
PG1807-17	멀티미디어시스템	박은정	B동103	10	12	화
PG1807-18	컴퓨터비젼	최은주	C동609	9	10	월
PG1807-19	암호론	김은영	C동309	13	15	화
PG1807-20	확률및통계	이현주	B동309	15	16	수
PG1807-21	정보시스템설계및구축	박은경	B동510	17	18	화수
PG1807-22	웹서버프로그래밍	최현정	C동312	9	10	목금
PG1807-23	실용한문	김미정	A동301	10	11	월수
PG1807-24	역사의이해	이지혜	A동304	11	12	화금
PG1807-25	세계문화사	박선영	A동405	10	12	월
PG1807-26	민족과통일	최지연	A동509	9	10	월
PG1807-27	종교의이해	김혜진	A동507	13	15	금
PG1807-28	철학의이해	이유진	A동210	15	16	월화
PG1807-29	논리와사고	박지은	A동316	17	18	월금
PG1807-30	언어의이해	최수진	A동412	9	10	목
PG1807-31	직업윤리	김은지	A동512	10	11	금
PG1807-32	인터넷윤리	이아름	A동513	11	12	금
PG1807-33	문학과사회	박지현	A동617	10	12	목
PG1807-34	동양고전의이해	최보람	A동615	9	10	월
PG1807-35	서양고전의이해	김혜진	A동617	13	15	월화
PG1807-36	전통문화의이해	박선영	A동615	15	16	목금
PG1807-37	대중문화와매스미디어	김서연	A동615	17	18	수금
PG1807-38	현대사회와디자인	이민지	A동520	9	10	목
PG1807-39	미술의이해	박수빈	A동615	10	11	월
PG1807-40	음악의이해	최지원	A동620	11	12	월
PG1807-41	의생활과환경	김현지	A동617	10	12	금
PG1807-42	영화의이해	이예진	A동614	9	10	월화
PG1807-43	경제의이해	박예지	A동314	13	15	월금
PG1807-44	현대사회와경영	최민서	A동613	15	16	화
PG1807-45	국제화와무역	김서현	A동609	17	18	수
PG1807-46	법과사회	이서영	A동609	9	10	목
PG1807-47	현대사회와교육	박수민	A동617	10	11	금
PG1807-48	민주사회와시민의식	최예원	A동612	11	12	금
PG1807-49	사회복지개론	최예원	A동618	10	12	화수
PG1807-50	국제관계론	김영미	A동415	9	10	목금
'''


def make_data():
    import datetime
    from lecture.models import Lecture, DayOfWeek

    big_list = []
    temp = RAW_DATA.splitlines()

    for elem in temp:
        splits = elem.split('\t')
        big_list.append({
            'code': splits[0],
            'name': splits[1],
            'professor': splits[2],
            'location': splits[3],
            'start_time': splits[4],
            'end_time': splits[5],
            'dayofweek': splits[6],
        })

    for elem in big_list:
        code = elem['code']
        name = elem['name']
        professor = elem['professor']
        location = elem['location']
        start_time = datetime.time(hour=int(elem['start_time']))
        end_time = datetime.time(hour=int(elem['end_time']))
        dayofweek_list = list(elem['dayofweek'])

        lecture_obj = Lecture(
            code=code,
            name=name,
            professor=professor,
            location=location,
            start_time=start_time,
            end_time=end_time,
        )
        lecture_obj.save()

        for day in dayofweek_list:
            dow_obj = DayOfWeek.objects.get(name=day)
            lecture_obj.day.add(dow_obj)
