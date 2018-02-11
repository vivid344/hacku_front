function add() {
    var name = $("#name").val();
    var pass = $("#pass").val();
    $.ajax({
        url: "http://35.201.145.29:62070/api/v1/login?name=" + name + "&pass=" + pass,
        type: "post",
        async: false,
        timeout: 10000,
    }).done(function (getdata, textStatus, jqXHR) {
        alert("登録に成功しました！")
        location.href = "index.html";
    }).fail(function (jqXHR, textStatus, errorThrown) {
    });
}