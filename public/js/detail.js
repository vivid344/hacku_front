// サイズを設定
// ウィンドウサイズによって可変する
var size = {
    width: 0,
    height: 0
};

var data = [];

// d3用の変数
var win = d3.select(window);

// アニメーション終了の判定フラグ
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
            $("#main").append('<svg onclick="alert()" style="width:70%" size="2" id="chart' + (i + 1) + '"></svg>');
        } else {
            $("#other").append('<svg style="width:40%" size="2" id="chart' + (i + 1) + '"></svg>');
        }
        var svg = d3.select("#chart" + (i + 1)),
            pie = d3.layout.pie().sort(null).value(function (d) {
                return d.value;
            }),
            arc = d3.svg.arc().innerRadius(10);
        render(svg, pie, arc, i);
    }//貯金価格の取得　配列にグラフに必要なデータを格納
}

// グラフの描画
// 描画処理に徹して、サイズに関する情報はupdate()内で調整する。
function render(svg, pie, arc, x) {
    // グループの作成
    var g = svg.selectAll(".arc")
        .data(pie(data[x]))
        .enter()
        .append("g")
        .attr("class", "arc");

    // 円弧の作成
    g.append("path")
        .attr("stroke", "white")
        .attr("fill", function (d) {
            return d.data.color;
        });

    // データの表示
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


// グラフのサイズを更新
function update(svg, pie, arc, x) {

    // 自身のサイズを取得する
    size.width = parseInt(svg.style("width"));

    // 円グラフの外径を更新
    arc.outerRadius(size.width / 2);

    // 取得したサイズを元に拡大・縮小させる
    svg
        .attr("width", size.width)
        .attr("height", size.width);

    // それぞれのグループの位置を調整
    var g = svg.selectAll(".arc")
        .attr("transform", "translate(" + (size.width / 2) + "," + (size.width / 2) + ")");

    // パスのサイズを調整
    // アニメーションが終了していない場合はサイズを設定しないように
    if (isAnimated) {
        g.selectAll("path").attr("d", arc);
    }

    // テキストの位置を再調整
    g.selectAll("text").attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
    });

    animate(svg, pie, arc, x)
}


// グラフのアニメーション設定
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
            isAnimated = i === length; //最後の要素の時だけtrue
        });
}


// 初期化
get_data();
win.on("resize", update); // ウィンドウのリサイズイベントにハンドラを設定