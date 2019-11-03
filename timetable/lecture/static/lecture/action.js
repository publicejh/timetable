window.onload = function() {
    $('.card-lecture').click(function () {
        let item = $(this);
        let id = item.data("id");
        let name = item.data("name");
        let time = item.data("time");
        let code = item.data("code");
        let professor = item.data("professor");
        let location = item.data("location");
        // console.log(item);
        // console.log($('#modal-lecture-info .list-lecture-info li'));
        $('#modal-lecture-info .lecture-title').text(name);
        $('#modal-lecture-info .lecture-time span').text(time);
        $('#modal-lecture-info .lecture-code span').text(code);
        $('#modal-lecture-info .lecture-professor span').text(professor);
        $('#modal-lecture-info .lecture-location span').text(location);
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
        // console.log(item);
        // console.log($('#modal-lecture-task .lecture-title'));
        $('#modal-lecture-task .lecture-title').text(name);
        $('#modal-lecture-task .lecture-time span').text(time);
        $('#modal-lecture-task .lecture-code span').text(code);
        $('#modal-lecture-task .lecture-professor span').text(professor);
        $('#modal-lecture-task .lecture-location span').text(location);
        $('#modal-lecture-task #btn-remove-lecture').data('id', id);
        $('#btn-add-memo').data('id', id);
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
          url: 'http://localhost:8003/api/v1/lectures/' + id,
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
          url: 'http://localhost:8003/api/v1/lectures/' + id,
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
          url: 'http://localhost:8003/api/v1/memos/',
          type: 'POST',
          data: "lecture=" + lecture + "&title=" + title + "&content=" + content,
          success: function(data) {
            alert('메모를 등록했습니다.');
            location.reload();
          }
        });
    });

    $('#home-title').click(function () {
        window.location = window.location.pathname;
    });
};