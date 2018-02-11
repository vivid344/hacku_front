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
        var tmp;//招待未完成
        $.ajax({
            url: "http://35.201.145.29:62070/api/v1/make_group?name=" + group_name + "&date=" + dead + "&users=[]&user_id=" + sessionStorage.user_id,
            type: "POST",
            async: false,
            timeout: 10000,
        }).done(function (getdata, textStatus, jqXHR) {
            location.href = "setting.html#" + getdata.group_id;
        }).fail(function (jqXHR, textStatus, errorThrown) {
        });
    }
}

$(function () {
    var data = [
    'accepts',
    'action_name',
    'add',
    'add_column',
    'add_index',
    'add_timestamps',
    'after_create',
    'after_destroy',
    'after_filter',
    'all'];

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

    $('#invite').autocomplete({
    source: data,
    autoFocus: true,
    delay: 500,
    minLength: 1
  });
});
