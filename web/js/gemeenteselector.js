window.GemeenteSelector = Stapes.subclass({
    constructor : function(el, data) {
        this.el = el;
        this.$el = $(el);
        this.provinces = data.provinces;
        this.gemeentes = data.gemeentes
        this.bindEventHandlers();
    },

    bindEventHandlers : function() {
        this.$el.on('click', 'li', function(e) {
            this.emit('select', $(e.target).data('place') );
        }.bind(this));
    },

    hide : function() {
        this.$el.parent().addClass('contracted');
    },

    render : function() {
        this.gemeentes.forEach(function(label) {
            var place = { label : label, type : 'gemeente' };
            this.$el.append( $("<li>" + label + "</li>").data('place', place) );
        }, this);

        this.provinces.forEach(function(label) {
            var place = { label : label, type : 'province' };
            this.$el.append( $("<li>" + label + "</li>").data('place', place) );
        }, this)
    },

    select : function(place) {
        this.$el.find("option").removeAttr('selected');
        this.$el.find("option[value=" + place + "]").attr('selected', 'selected');
    },

    show : function() {
        this.$el.parent().removeClass('contracted');
    }
});