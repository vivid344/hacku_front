function init() {
    var tmp;
    $.ajax({
        url: "http://35.201.145.29:62070/api/v1/lists/"+sessionStorage.user_id,
        type: "GET",
        async: false,
        timeout: 10000,
    }).done(function (getdata, textStatus, jqXHR) {
        tmp = getdata;
    }).fail(function (jqXHR, textStatus, errorThrown) {
    });
    var i;
    for (i = 0; i < tmp.length; i++) {
        if (tmp[i].status == "doing") {
            $("#list").append('<a onclick="detail_button('+tmp[i].id+')"><div style="border-bottom: solid 1px #EBEBEB" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">group</i><span>' + tmp[i].g_name + '</span></span><i class="material-icons mini">forward</i></div></a>');
        } else if (tmp[i].status == "invite") {
            $("#list").append('<a onclick="approval_button('+tmp[i].id+')"><div style="border-bottom: solid 1px #EBEBEB" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">group</i><span>' + tmp[i].g_name + '</span></span><i class="material-icons mini">warning</i></div></a>');
        } else if (tmp[i].status == "success") {
            $("#list").append('<a onclick="success_button('+tmp[i].id+')"><div style="border-bottom: solid 1px #EBEBEB" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">group</i><span>' + tmp[i].g_name + '</span></span><i class="material-icons mini">event_available</i></div></a>');
        } else {
            $("#list").append('<a onclick="fire_button('+tmp[i].id+')"><div style="border-bottom: solid 1px #EBEBEB" class="mdl-list__item"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">group</i><span>' + tmp[i].g_name + '</span></span><i class="material-icons mini">event_busy</i></div></a>');
        }
    }
}