window.Chart = Stapes.subclass({
    constructor : function(el, data) {
        this.el = el;
        this.$el = $(el);
        this.data = data;

        this.emptyColumns = data.columns.map(function(column) {
            return column.map(function(val) {
                if (typeof val === 'number') {
                    return 0;
                } else {
                    return val;
                }
            });
        });
    },

    show : function() {
        this.chart.load({
            columns : this.data.columns
        });
    }
});