function login() {
    var name = $("#name").val();
    var pass = $("#pass").val();
    $.ajax({
        url: "https://private-dec7c-eniwa03.apiary-mock.com/api/v1/login",
        type: "GET",
        data: {
            "name": name,
            "pass": pass
        },
        async: false,
        timeout: 10000,
    }).done(function (getdata, textStatus, jqXHR) {
        var tmp = getdata;
        if (tmp.error) {
            location.href = location.href + "#-1";
        } else {
            sessionStorage.user_id = tmp.user_id;
            location.href = "list.html";
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
    });
}