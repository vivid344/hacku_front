function approval_button(group_id) {
    swal({
        title: "承認しますか?",
        text: "グループから招待が届いています。承認しますか？",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    //もし承認するなら
        .then((willDelete) => {
        if (willDelete) {
            $.ajax({
                url: "http://35.201.145.29:62070/api/v1/invite_group?user_id="+sessionStorage.user_id+"&group_id="+group_id+"&status=1",
                type: "POST",
                async: false,
                timeout: 10000,
            }).done(function (getdata, textStatus, jqXHR) {
                tmp = getdata;
            }).fail(function (jqXHR, textStatus, errorThrown) {
            });
            location.href = 'setting.html#'+group_id;
        }
    });
}

function fire_button(group_id){
    swal({
        title: "目標達成できませんでした。",
        text: "グループの皆さんが目標金額までお金を貯めることができませんでした。残念ですが、あなたが貯金したお金は全て「Yahoo！ネット募金」に募金されます。",
        icon: "error",
        buttons: {
            cancel: "閉じる",
            catch: {
                text: "詳細を見る",
                value: "catch",
            },
        },
        dangerMode: true,
    })
    //もし承認するなら
        .then((value) => {
        switch (value) {

        case "defeat":
            break;

        case "catch":
            window.location.href = 'detail.html#'+group_id;
            break;

        default:
        }
    });
}

function success_button(group_id){
    swal({
        title: "おめでとうございます。",
        text: "目標金額に達しました。貯めたお金でショッピングを楽しんでください",
        icon: "success",
        buttons: {
            cancel: "閉じる",
            catch: {
                text: "詳細を見る",
                value: "catch",
            },
        },
        dangerMode: true,
    })
    //もし承認するなら
        .then((value) => {
        switch (value) {

        case "defeat":
            break;

        case "catch":
            window.location.href = 'detail.html#'+group_id;
            break;

        default:
        }
    });
}
function detail_button(group_id){
    window.location.href = 'detail.html#'+group_id;
}