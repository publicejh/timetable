window.onload = function() {
    $('.card-lecture').click(function () {
        let item = $(this);
        let id = item.data("id");
        let name = item.data("name");
        let time = item.data("time");
        let code = item.data("code");
        let professor = item.data("professor");
        let location = item.data("location");
        let description = item.data("description");

        $('#modal-lecture-info .lecture-title').text(name);
        $('#modal-lecture-info .lecture-time span').text(time);
        $('#modal-lecture-info .lecture-code span').text(code);
        $('#modal-lecture-info .lecture-professor span').text(professor);
        $('#modal-lecture-info .lecture-location span').text(location);
        $('#modal-lecture-info .lecture-description p').text(description);
        $('#modal-lecture-info #btn-add-lecture').data('id', id);
        $('#modal-lecture-info').modal('show');
    });

    $('.lecture-time > a').click(function () {
        let item = $(this);
        let id = item.data("id");
        let name = item.data("name");
        let time = item.data("time");
        let code = item.data("code");
        let professor = item.data("professor");
        let location = item.data("location");
        let description = item.data("description");
        let memos = item.data("memos");
        let memoIds = item.data("memoids");
        let temp = memos.split('[');

        memoIds = memoIds.substring(11).slice(0, -2);
        memoIds = memoIds.split('), ');
        let id_arr = [];
        for (let i in memoIds) {
            id_arr.push(memoIds[i].split(',')[0].substring(1));
        }

        temp = temp[1].split(']');
        temp = temp[0].split(',');
        let arr = [];
        for (let i in temp) {
            let newTemp = temp[i].substring(7).slice(0, -1);
            if (newTemp.length !== 0) {
                arr.push(newTemp);
            }
        }
        console.log(arr);


        $('#modal-lecture-task .lecture-title').text(name);
        $('#modal-lecture-task .lecture-time span').text(time);
        $('#modal-lecture-task .lecture-code span').text(code);
        $('#modal-lecture-task .lecture-professor span').text(professor);
        $('#modal-lecture-task .lecture-location span').text(location);
        $('#modal-lecture-task .lecture-description p').text(description);
        $('#modal-lecture-task #btn-remove-lecture').data('id', id);
        $('#btn-add-memo').data('id', id);



        const div = document.createElement('div');
        div.innerHTML = `<h5 class="memo-header">메모</h5>`;
        if (arr.length !== 0) {
            for (let i in arr) {
                div.innerHTML +=
                    `
            <ul>
                <li class="memo-list">
                    <div class="memo-content" data-toggle="tooltip" data-placement="top" title="" data-original-title="과제 설명 텍스트 과제 설명 텍스트 과제 설명 텍스트">
                        <i class="material-icons ic-lecture-noti">assignment</i>
                        <span class="lecture-noti-title">` + arr[i] + `</span>
                    </div>
                    <div class="memo-btn">
                        <a href="#"><i class="material-icons ic-lecture-noti" id="btn-delete-memo" data-id="`+ id_arr[i] +`">delete</i></a>
                    </div>
                </li>
            </ul>
            `
            }
        }

        $('#modal-lecture-task .lecture-memo').html(div);

        $('#modal-lecture-task').modal('show');
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    // $(function () {
    //     $('[data-toggle="popover"]').popover({
    //         container: 'body',
    //         html: true,
    //         placement: 'right',
    //         sanitize: false,
    //         content: function () {
    //             // event.preventDefault();
    //             return $("#PopoverContent").html();
    //         }
    //     });
    // });

    $('#btn-memo').click(function () {
        $('#modal-memo').modal('show');
    });


    $('#btn-add-lecture').click(function () {
        let item = $(this);
        let id = item.data("id");
        $.ajax({
          url: 'http://localhost:8000/api/v1/lectures/' + id,
          type: 'PATCH',
          data: "is_registered=true",
          success: function(data) {
            alert('과목을 등록했습니다.');
            location.reload();
          },
          error: function (data) {
            alert('과목을 등록할 수 없습니다. 시간표를 확인하세요!');
          }
        });
    });

    $('#btn-remove-lecture').click(function () {
        let item = $(this);
        let id = item.data("id");
        // alert(id);
        $.ajax({
          url: 'http://localhost:8000/api/v1/lectures/' + id,
          type: 'PATCH',
          data: "is_registered=false",
          success: function(data) {
            alert('과목을 제외했습니다.');
            location.reload();
          }
        });
    });

    $('#btn-add-memo').click(function () {
        let item = $(this);
        let lecture = item.data("id");
        let title = $('#recipient-name').val();
        let content = $('#message-text').val();
        $.ajax({
          url: 'http://localhost:8000/api/v1/memos/',
          type: 'POST',
          data: "lecture=" + lecture + "&title=" + title + "&content=" + content,
          success: function(data) {
            alert('메모를 등록했습니다.');
            location.reload();
          }
        });
    });

    $('#btn-delete-memo').click(function () {
        let item = $(this);
        let id = item.data("id");
        $.ajax({
          url: 'http://localhost:8000/api/v1/memos/' + id,
          type: 'DELETE',
          success: function(data) {
            alert('메모를 삭제했습니다.');
            location.reload();
          }
        });
    });

    $('#home-title').click(function () {
        window.location = window.location.pathname;
    });
};