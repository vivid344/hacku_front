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

    $.ui.autocomplete.prototype._renderItem = function (ul, item) {
        var suggest = $('<li></li>').data('item.autocomplete', item);
        var label = '';
        // 検索にヒットしなければ

        if (item.category == 'harbor') { //漁港の場合
            label = '<img class="search-icons" src="/static/img/harbor.svg">'
                + '<span class="item-label">' + item.label + '</span>'
                + '<span class="prefecture">' + item.prefecture + '</span>';
        } else if (item.category == 'prefecture') { //都道府県の場合
            label = '<img class="pre-icons" src="/static/img/japan.svg">'
                + '<span class="item-label">' + item.label + '</span>';
        } else if (item.category == 'history') { //履歴の場合
            label = '<img class="search-icons" src="/static/img/history_icon.svg">'
                + '<span class="item-label">' + item.label + '</span>'
                + '<span class="prefecture">' + item.prefecture + '</span>';
        }
        var suggest_add = suggest.append($('<li></li>').html(label));//サジェスト部分のタグにhtmlを追記する
        return suggest_add.appendTo(ul);//ulに内容をコピーする
    };

    $('.mdl-textfield__input').autocomplete({
        source: function (req, resp) {
            if (req.term != '') {
                $.ajax({
                    url: 'https://private-dec7c-eniwa03.apiary-mock.com/api/v1/users?keyword=' + req.term,
                    type: 'GET',
                    dataType: 'json',
                    async: true,
                    success: function (harbors) {
                        resp(harbors);
                    }
                });
            }
        },
        select: function (e, harbor) {
            var selected_item = harbor.item;

            // 検索にヒットしなかった場合
            if (selected_item.value == 'not_found')return false;

            if (selected_item) {
                var category = '',
                    flag = selected_item.prefecture_flag,
                    item_name = selected_item.value,
                    lat = selected_item.lat,
                    lng = selected_item.lng,
                    prefecture = selected_item.prefecture;

                $('.mdl-textfield').removeClass('is-focused');
                $('.mdl-textfield').removeClass('is-dirty');
                $('.mdl-textfield__input').blur();

                set_cookie(item_name, lat, lng, prefecture, flag);

                // 既に存在するならば削除
                if (map_layer.hasLayer(search_layer)) map_layer.removeLayer(search_layer);

                $('#graph').fadeOut(500);

                // 表示している内容に応じて，フェードアウトさせるものを変える
                var current_layer = map.getCurrentLayerNode();
                $(current_layer).fadeOut(500, function () {
                    map.initSearchLayer(item_name, lat, lng, flag, category);
                });
            }
        },
        open: function () {
            var autocomplete = $('.ui-autocomplete');
            autocomplete.css('top', '45px');
            autocomplete.css('left', 'auto');
            autocomplete.css('right', '2.9%');
            autocomplete.css('width', '+=2.8rem');
            var not_found = $('.not-found');
            not_found.parents('.ui-menu-item').css('pointer-events', 'none');
        },
        minLength: 0
    }).focus(function () {
        //テキストボックスにフォーカスした際，初期値として空を代入する
        jQuery(this).autocomplete('search', '');
    });
});
