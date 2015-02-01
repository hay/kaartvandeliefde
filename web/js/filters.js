window.Filters = Stapes.subclass({
    constructor : function(el, data) {
        this.el = el;
        this.$el = $(el);
        this.data = data;
        this.template = Handlebars.compile( $("#tmpl-filters").html() );
        this.bindEventHandlers();
    },

    bindEventHandlers : function() {
        var self = this;

        this.$el.on('click', '.filterlist-item', function() {
            var $el = $(this);
            var filter = $el.data('filter');
            var label = $el.data('label');
            self.emit('click', { filter : filter, label : label });
        });
    },

    getFilter : function(filter) {
        return this.data.filter(function(f) {
            return f.key === filter;
        })[0];
    },

    getFilters : function() {
        return this.data;
    },

    render : function() {
        var html = this.template({ filters : this.data });
        this.$el.html(html);
    },

    toggle : function(filter, label) {
        var item = this.getFilter(filter);
        var value = item.values.filter(function(v) {
            return v.label === label;
        })[0];

        value.selected = !value.selected;

        var $value = $('.filterlist-item[data-filter="' + filter + '"][data-label="' + label + '"]');
        $value.toggleClass('active', value.selected);

        this.emit('change');
    }
});