window.BarChart = Chart.subclass({
    constructor : function(el, data) {
        Chart.prototype.constructor.apply(this, arguments);

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
            }
        });
    }
});