// TODO: make this stuff handle more than one gemeente properly
window.PieChart = Chart.subclass({
    constructor : function(el, data) {
        Chart.prototype.constructor.apply(this, arguments);

        var columns = [];

        for (var i = 0; i < data.columns.length; i++) {
            var column = data.labels.map(function(label, index) {
                return [label, data.columns[i][index + 1]];
            });

            columns.push({
                gemeente : data.columns[i][0],
                data : column
            });
        }

        this.$el.append('<table class="chart_table"><tr></tr></table>');

        columns.forEach(function(column) {
            var $el = $('<td><h2>' +  column.gemeente + '</h2><div class="piechart"></div></td>');
            this.$el.find("table tr").append($el);

            c3.generate({
                bindto : $el.find(".piechart").get(0),
                data : {
                    columns : column.data,
                    type : 'pie'
                },
                legend : {
                    show : true
                },
                tooltip : {
                    show : false
                }
            });
        }, this);
    }
});