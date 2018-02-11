function login() {
    var name = $("#name").val();
    var pass = $("#pass").val();
    $.ajax({
        url: "http://35.201.145.29:62070/api/v1/login",
        type: "GET",
        data: {
            "name": name,
            "pass": pass
        },
        async: false,
        timeout: 10000,
    }).done(function (getdata, textStatus, jqXHR) {
        var tmp = getdata;
        if (tmp.status == "error") {
            location.href = location.hostname + location.pathname + "?-1";
        } else {
            sessionStorage.user_id = tmp.user_id;
            location.href = "list.html";
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
    });
}