var users = "[";

function make_group() {
    var group_name = $("#group").val();
    var dead = $("#datepicker").val();
    var today = new Date();
    var dead_day = new Date(dead);

    if (!group_name) {
        alert("グループ名を入力して下さい");
    } else if (today > dead_day || !dead) {
        alert("未来の日付を入力して下さい");
    } else {
        dead = dead.replace("/", "-");
        dead = dead.replace("/", "-");
        if (users != "[") {
            users = users.slice(0, -1);
        }
        users = users + "]";
        var tmp;//招待未完成
        $.ajax({
            url: "http://35.201.145.29:62070/api/v1/make_group?name=" + group_name + "&date=" + dead + "&users=" + users + "&user_id=" + sessionStorage.user_id,
            type: "POST",
            async: false,
            timeout: 10000,
        }).done(function (getdata, textStatus, jqXHR) {
            location.href = "setting.html#" + getdata.group_id;
        }).fail(function (jqXHR, textStatus, errorThrown) {
        });
    }
}

function logout() {
    sessionStorage.user_id = "";
    location.href="index.html"
}

$(function () {
    $("#datepicker").datepicker();
    if ((navigator.userAgent.indexOf('iPhone') > 0
        && navigator.userAgent.indexOf('iPad') == -1)
        || navigator.userAgent.indexOf('iPod') > 0
        || navigator.userAgent.indexOf('Android') > 0) {
        var bH = $('.fix_menu_smartphone').height();
        $('body').css('margin-bottom', bH + 'px');
    } else {
        $('.fix_menu_smartphone').css('display', 'none');
    }

    var data;
    $('.autocomplete').autocomplete({
        source: function (req, resp) {
            if (req.term != '') {
                $.ajax({
                    url: 'http://35.201.145.29:62070/api/v1/users?keyword=' + req.term,
                    type: 'GET',
                    dataType: 'json',
                    async: true,
                    success: function (user) {
                        data = user;
                        resp(user);
                    }
                });
            }
        },
        select: function (e, user) {
            users = users + user.item.id + ",";
            $("#list").append("<div style='padding-top: 3%'>"+user.item.label+"</div>")
        },
        minLength: 1
    });
});
