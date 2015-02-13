window.Places = Stapes.subclass({
    constructor : function(el) {
        this.$el = $(el);
        this.places = INIT_PLACES;
        this.tmpl = Handlebars.compile( $("#tmpl-places").html() );
        this.bindEventHandlers();
    },

    addPlace : function(place) {
        // Make sure we don't add stuff that's already there
        if (this.hasPlace(place)) {
            return;
        }

        // Maximum number of places
        if (this.places.length === 3) {
            return;
        }

        this.places.push(place);

        this.emit('change');
    },

    bindEventHandlers : function() {
        var self = this;

        this.$el.on('click', '.filter_gemeente', function() {
            var $el = $(this);

            self.remove({
                label : $el.data('label'),
                type : $el.data('type')
            });
        });
    },

    getPlaces : function() {
        return _.clone(this.places);
    },

    hasPlace : function(place) {
        var check = this.places.filter(function(p) {
            return p.type === place.type && p.label === p.place;
        });

        return !!check.length;
    },

    render : function() {
        var places = this.places.map(function(place) {
            place.theme = app.getCurrPageName();
            return place;
        });

        var html = this.tmpl({ places : places });
        this.$el.html(html);
    },

    remove : function(place) {
        // We don't delete countries
        if (place.type === 'country') {
            return;
        }

        this.places = this.places.filter(function(p) {
            return p.type !== place.type && p.label !== place.label;
        });

        // Check if this is not empty
        if (!this.places.length) {
            this.places = INIT_PLACES;
        }

        this.emit('change');
    }
});