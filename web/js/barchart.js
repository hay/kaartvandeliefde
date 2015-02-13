window.BarChart = Chart.subclass({
    constructor : function(el, data) {
        Chart.prototype.constructor.apply(this, arguments);

        var colors = CHART_COLORS.map(function(val) {
            return val === '%theme' ? THEME_COLORS[data.themeId][0] : val;
        });

        this.chart = c3.generate({
            bindto : el,
            axis : {
                x : {
                    type : 'category',
                    categories : data.labels
                },
                y : {
                    tick : {
                        count : 11,
                        format : function(d) {
                            var p = Math.ceil( d * 100) + '%';

                            // Bit of a hack obviously
                            return p === '99%' ? '100%' : p;
                        }
                    }
                },
                rotated : true
            },
            data : {
                columns : this.emptyColumns,
                type : 'bar'
            },
            legend : {
                show : true
            },
            tooltip : {
                show : false
            },
            color : {
                pattern : colors
            }
        });
    }
});