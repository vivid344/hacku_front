if (!sessionStorage.user_id) {
    location.href = "index.html";
}

var users = "[";
var g_id = location.hash.replace("#", "")

function make_group() {

    if (users != "[") {
        users = users.slice(0, -1);
    }
    users = users + "]";
    var tmp;//招待未完成
    $.ajax({
        url: "http://35.201.145.29:62070/api/v1/invite?group_id=" + g_id + "&users=" + users,
        type: "POST",
        async: false,
        timeout: 10000,
    }).done(function (getdata, textStatus, jqXHR) {
        location.href = "detail.html#" + g_id;
    }).fail(function (jqXHR, textStatus, errorThrown) {
    });

}

function logout() {
    sessionStorage.user_id = "";
    location.href="index.html"
}

$(function () {
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
            $("#list").append('<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-icon">person</i>' + user.item.label + ' </span> </li>');
        },
        minLength: 1
    });
});
