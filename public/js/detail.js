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
    var g_id = 1;
    var tmp;
    $.ajax({
        url: "https://private-dec7c-eniwa03.apiary-mock.com/api/v1/details/" + g_id,
        type: "GET",
        async: false,
        timeout: 10000,
    }).done(function (getdata, textStatus, jqXHR) {
        tmp = getdata;
    }).fail(function (jqXHR, textStatus, errorThrown) {
    });
    var i;
    for (i = 0; i < tmp.individual.length; i++) {
        var value = tmp.individual[i].current / tmp.individual[i].goal * 100;
        data[i] = [{legend: "貯金", value: value, color: "#8484ff"},
            {legend: "残り", value: 100 - value, color: "#ff8484"}];
        if (i == 0) {
            $("#main").append('<svg style="width:70%" onclick="open_madal(' + tmp.individual[i].user_id + ',' + location.hash + ')" id="chart' + (i + 1) + '"></svg>'
            )
            ;
        } else {
            $("#other").append('<svg style="width:40%" onclick="open_madal()" id="chart' + (i + 1) + '"></svg>');
        }
        var svg = d3.select("#chart" + (i + 1)),
            pie = d3.layout.pie().sort(null).value(function (d) {
                return d.value;
            }),
            arc = d3.svg.arc().innerRadius(10);
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

function open_madal(user_id, g_id) {
    var dialog = document.querySelector('#detail_dialog');
    var tmp;

    $.ajax({
        url: "https://private-dec7c-eniwa03.apiary-mock.com/api/v1/set/?user_id=" + user_id + "&g_id=" + 1,
        type: "GET",
        async: false,
        timeout: 10000,
    }).done(function (getdata, textStatus, jqXHR) {
        tmp = getdata;
        console.log(tmp);
    }).fail(function (jqXHR, textStatus, errorThrown) {
    });
    $('#detail_dialog').html("<p>目標金額：" + tmp.price + "円</p><p>目標：" + tmp.description + "</p>");
    $('#detail_dialog').append('<button type="button" class="mdl-button" onclick="close_modal()">Close</button>');
    dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
}

function open_charge_madal(){
    var dialog = document.querySelector('#charge_dialog');
    dialogPolyfill.registerDialog(dialog);
    dialog.showModal();
}

function close_modal() {
    var dialog = document.querySelector('#detail_dialog');
    dialogPolyfill.registerDialog(dialog);
    dialog.close();
}

function move_setting() {
    location.href = "form.html";
}