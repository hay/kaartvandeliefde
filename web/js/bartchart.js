window.BarChart = Stapes.subclass({
    constructor : function(el, data) {
        this.el = el;
        this.data = data;

        var emptyColumns = data.columns.map(function(column) {
            return column.map(function(val) {
                if (typeof val === 'number') {
                    return 0;
                } else {
                    return val;
                }
            });
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
                columns : emptyColumns,
                type : 'bar'
            },
            legend : {
                show : true
            },
            tooltip : {
                show : false
            }
        });
    },

    show : function() {
        this.chart.load({
            columns : this.data.columns
        })
    }
});