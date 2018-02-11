// サイズを設定
// ウィンドウサイズによって可変する
var size = {
    width: 0,
    height: 0
};

var data = [];


var win = d3.select(window);

var isAnimated = false;

function get_data() {
    var g_id = location.hash.replace("#", "");
    var tmp;
    $.ajax({
        url: "http://35.201.145.29:62070/api/v1/details/" + g_id,
        type: "GET",
        async: false,
        timeout: 10000,
    }).done(function (getdata, textStatus, jqXHR) {
        tmp = getdata;
    }).fail(function (jqXHR, textStatus, errorThrown) {
    });

    $("#dead").html('<i class="material-icons" style="padding-right: 3%;color: red">warning</i>' + tmp.dead);

    var i;
    for (i = 0; i < tmp.individual.length; i++) {
        var value = tmp.individual[i].current / tmp.individual[i].goal * 100;
        if (value > 100) {
            value = 100
        }
        if (isNaN(value)) {
            value = 0;
        }
        data[i] = [{legend: "貯金", value: value, color: "#8484ff"},
            {legend: "", value: 100 - value, color: "#ff8484"}];
        if (i == 0) {
            $("#main").append('<svg style="width:70%;padding-bottom: 5%" onclick="open_modal(' + tmp.individual[i].user_id + ',' + g_id + ')" id="chart' + (i + 1) + '"></svg>');
        } else {
            $("#other").append('<svg style="width:40%;padding-bottom: 5%" onclick="open_modal(' + tmp.individual[i].user_id + ',' + g_id + ')" id="chart' + (i + 1) + '"></svg>');
        }
        var svg = d3.select("#chart" + (i + 1)),
            pie = d3.layout.pie().sort(null).value(function (d) {
                return d.value;
            }),
            arc = d3.svg.arc().innerRadius(30);

        render(svg, pie, arc, i);
    }
}

function render(svg, pie, arc, x) {
    var g = svg.selectAll(".arc")
        .data(pie(data[x]))
        .enter()
        .append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("stroke", "white")
        .attr("fill", function (d) {
            return d.data.color;
        });

    var maxValue = d3.max(data[x], function (d) {
        return d.value;
    });

    g.append("text")
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.legend;
        });
    update(svg, pie, arc, x)
}


function update(svg, pie, arc, x) {

    size.width = parseInt(svg.style("width"));

    arc.outerRadius(size.width / 2);

    svg
        .attr("width", size.width)
        .attr("height", size.width);

    var g = svg.selectAll(".arc")
        .attr("transform", "translate(" + (size.width / 2) + "," + (size.width / 2) + ")");

    if (isAnimated) {
        g.selectAll("path").attr("d", arc);
    }

    g.selectAll("text").attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
    });

    animate(svg, pie, arc, x)
}


function animate(svg, pie, arc, x) {
    var g = svg.selectAll(".arc"),
        length = data[x].length,
        i = 0;

    g.selectAll("path")
        .transition()
        .ease("bounce")
        .delay(500)
        .duration(1000)
        .attrTween("d", function (d) {
            var interpolate = d3.interpolate(
                {startAngle: 0, endAngle: 0},
                {startAngle: d.startAngle, endAngle: d.endAngle}
            );
            return function (t) {
                return arc(interpolate(t));
            };
        })
        .each("end", function (transition, callback) {
            i++;
            isAnimated = i === length;
        });
}

get_data();
win.on("resize", update);

function open_modal(user_id, g_id) {
    var dialog = document.querySelector('#detail_dialog');
    var tmp;

    $.ajax({
        url: "http://35.201.145.29:62070/api/v1/set?user_id=" + user_id + "&g_id=" + g_id,
        type: "GET",
        async: false,
        timeout: 10000,
    }).done(function (getdata, textStatus, jqXHR) {
        tmp = getdata;
    }).fail(function (jqXHR, textStatus, errorThrown) {
    });

    $('#detail_dialog').html("<p>ユーザ名：" + tmp.user_name + "</p><p>目標金額：" + tmp.goal_price + "円</p><p>現在金額：" + tmp.current_price + "円</p><p>目標：" + tmp.description + "</p>");
    $('#detail_dialog').append('<button type="button" class="mdl-button mdl-js-button mdl-button--raised" onclick="close_modal()">閉じる</button>');
    dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
}

function open_charge_modal() {
    var dialog = document.querySelector('#charge_dialog');
    dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
}

function close_modal() {
    var dialog = document.querySelector('#detail_dialog');
    dialogPolyfill.registerDialog(dialog);
    dialog.close();
}

function close_modal2() {
    var dialog = document.querySelector('#charge_dialog');
    dialogPolyfill.registerDialog(dialog);
    dialog.close();
}

function move_setting() {
    location.href = "form.html";
}

function send_charge() {
    var price = $("#price").val();
    $.ajax({
        url: "http://35.201.145.29:62070/api/v1/charge?user_id=" + sessionStorage.user_id + "&group_id=" + location.hash.replace("#", "") + "&price=" + price,
        type: "POST",
        async: false,
        timeout: 10000,
    }).done(function (getdata, textStatus, jqXHR) {
        location.reload();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("error");
    });
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
});