window.PlaceSelector = Stapes.subclass({
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
        this.$el.addClass('contracted');
    },

    render : function() {
        var $gemeentes = $('<ul></ul>');

        this.gemeentes.forEach(function(label) {
            var place = { label : label, type : 'gemeente' };
            $gemeentes.append( $("<li>" + label + "</li>").data('place', place) );
        }, this);

        var $provinces = $('<ul></ul>');

        this.provinces.forEach(function(label) {
            var place = { label : label, type : 'province' };
            $provinces.append( $("<li>" + label + "</li>").data('place', place) );
        }, this)

        var $gc = $('<div class="placeselector-list-container"></div>');
        var $pc = $('<div class="placeselector-list-container"></div>');

        $gc.append('<div class="placeselector-header">Gemeentes</div>');
        $gc.append( $gemeentes );
        $pc.append('<div class="placeselector-header">Provincies</div>');
        $pc.append( $provinces );

        this.$el.append($gc);
        this.$el.append($pc);
    },

    show : function() {
        this.$el.removeClass('contracted');
    }
});