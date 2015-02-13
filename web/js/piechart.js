// TODO: make this stuff handle more than one gemeente properly
window.PieChart = Chart.subclass({
    constructor : function(el, data) {
        Chart.prototype.constructor.apply(this, arguments);

        var columns = [];

        for (var i = 0; i < data.columns.length; i++) {
            var column = data.labels.map(function(label, index) {
                var value = data.columns[i][index + 1];

                // Check for NaNs
                if (isNaN(value)) {
                    throw new Exception("[PieChart] Invalid data values");
                }

                return [label, value];
            });

            columns.push({
                gemeente : data.columns[i][0],
                data : column.reverse()
            });
        }

        // First create the divs
        var html = columns.map(function(column) {
            return '<div class="piechart"><h2>' + column.gemeente + '</h2><div class="piechart-chart"></div></div>';
        }).join('');

        this.$el.append('<div class="piechart-container">' + html + '</div>');

        columns.forEach(function(column, index) {
            var $el = this.$el.find(".piechart-chart").eq(index);

            var colors = CHART_COLORS.map(function(val) {
                return val === '%theme' ? THEME_COLORS[data.themeId][index] : val;
            });

            c3.generate({
                bindto : $el.get(0),
                data : {
                    columns : column.data,
                    type : 'pie'
                },
                legend : {
                    show : true
                },
                tooltip : {
                    show : false
                },
                color : {
                    pattern : colors
                },
                pie : {
                    label : {
                        format : function(value, ratio, id) {
                            return Math.round(value.toFixed(2) * 100) + '%';
                        }
                    }
                }
            });
        }, this);
    }
});