var charts = [];
var chartqs = [[["pie", ["V028", "V054"]], ["bar", ["V085_3", "V084_3"]], ["bar", "V086_4"], ["bar", "V086_3"], ["bar", "V086_2"], ["bar", "V087_2"], ["bar", "V087_3"], ["pie", "V075"], ["bar", "V023_3"]],
               [["bar", ["V122", "V082"]], ["bar", ["V025_4", "V052_4"]], ["bar", ["V025_1", "V052_1"]], ["pie", ["V024_1", "V051_1"]], ["pie", ["V024_2", "V051_2"]]],
               [["bar", "V053_3"], ["pie", "V053_1"], ["bar", "V053_2"], ["bar", ["V013_1", "V048_1"]], ["bar", ["V013_2", "V048_2"]], ["bar", "V027_5"], ["bar", "V027_4"], ["bar", "V027_1"], ["bar", "V027_2"]]
              ];

function getFilterData(chart){
    if ((chart.side == "left" && chart.g != filters_gemeente.left) || (chart.side == "right" && chart.g != filters_gemeente.right)){
        chart.sourceData = getSourceData(chart.q, chart.side);
        chart.g = (chart.side == "left")? filters_gemeente.left : filters_gemeente.right;
    }

    var fdata = chart.sourceData;

    for (var i in filters){
        if (filters.hasOwnProperty(i)) {
            fdata = fdata.filter(i, filters[i]);
        }
    }
    return fdata.countobj();
}

function getSourceData(q, side){
    var sdata = API.getData(q);

     if (filters_gemeente[side] != -1 && filters_gemeente[side] < gem_name.length){
        sdata = sdata.filter("gemeente", filters_gemeente[side]);
    }

    return sdata;
}


// TODO: this really should be on load of a 'page'
function createCharts() {
    $("z.themepage").each(function() {
        var $el = $(this);
        var themeid = $el.data('theme');
        var theme = window.THEMES[themeid];

        // TODO: generate the chartcontainers instead of having them beforehand
        $el.find(".chartcontainer").each(function( index ) {
            var $leftChart = $el.find(".chart_left").find(".chart_chart");
            var $rightChart = $el.find(".chart_right").find(".chart_chart");
            var chart = theme.charts[index];
            console.log(chart);

            if (chart === 'pie') {

            }

            if (chart === 'bar') {

            }

            if (chartqs[i-1][j][0] == "pie"){
                charts.push(new PieChart(getSourceData(chartqs[i-1][j][1], "left"), chartqs[i-1][j][1], filters_gemeente.left, "left", $left, color));
                charts.push(new PieChart(getSourceData(chartqs[i-1][j][1], "right"), chartqs[i-1][j][1], filters_gemeente.right, "right", $right, color));
            } else {
                charts.push(new BarChart(getSourceData(chartqs[i-1][j][1], "left"), chartqs[i-1][j][1], filters_gemeente.left, "left", $left, color));
                charts.push(new BarChart(getSourceData(chartqs[i-1][j][1], "right"), chartqs[i-1][j][1], filters_gemeente.right, "right", $right, color));
            }
        });
    });

    var maps = [
        new GeoMap(datastore.gemeentes, $(".contentHeader").eq(1), "#F21933"),
        new GeoMap(datastore.gemeentes, $(".contentHeader").eq(2), "#FFAA00"),
        new GeoMap(datastore.gemeentes, $(".contentHeader").eq(3), "#19C0D1")
    ];

    maps.forEach(function(map) {
        map.on('gemeenteSelect', function(gemeente) {
            filterGemeente(gemeente);
        });
    });

    // update();

}

function resize(){
    charts.forEach(function(e){
        e.resize();
    });
}

function update(){
    charts.forEach(function(e){
        e.update(getFilterData(e));
    });
}