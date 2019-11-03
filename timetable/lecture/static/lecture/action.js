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
        $('#modal-lecture-task').modal('show');
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    $(function () {
        $('[data-toggle="popover"]').popover({
            container: 'body',
            html: true,
            placement: 'right',
            sanitize: false,
            content: function () {
                return $("#PopoverContent").html();
            }
        });
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
          }
        });
    });

    $('#btn-remove-lecture').click(function () {
        let item = $(this);
        let id = item.data("id");
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

};