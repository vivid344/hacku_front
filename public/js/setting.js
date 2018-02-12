function set_desc() {
    var goal = $("#goal").val();
    var description = $("#description").val();

    if (!goal) {
        alert("目標金額を入力して下さい");
    } else if (!description) {
        alert("目標を入力して下さい");
    } else {
        var tmp;
        $.ajax({
            url: "http://35.201.145.29:62070/api/v1/setting?user_id=" + sessionStorage.user_id + "&group_id=" + location.hash.replace("#", "") + "&price=" + goal + "&description=" + description,
            type: "POST",
            async: false,
            timeout: 10000,
        }).done(function (getdata, textStatus, jqXHR) {
            location.href = "detail.html" + location.hash;
        }).fail(function (jqXHR, textStatus, errorThrown) {
        });
    }
}

function logout() {
    sessionStorage.user_id = null;
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
});
