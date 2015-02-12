window.Places = Stapes.subclass({
    constructor : function(el) {
        this.$el = $(el);
        this.places = INIT_PLACES;
        this.tmpl = Handlebars.compile( $("#tmpl-gemeentes").html() );
        this.bindEventHandlers();
    },

    // TODO: gemeente can be the same as province (Utrecht / Groningen)
    addGemeente : function(gemeente) {
        // Make sure we don't add stuff that's already there
        if (this.gemeentes.indexOf(gemeente) !== -1) {
            return;
        }

        // Maximum number of gemeentes
        if (this.gemeentes.length === 3) {
            return;
        }

        // If this gemeente is not blessed, get the province
        if (BLESSED_GEMEENTES.indexOf(gemeente) === -1) {
            var province = window.datastore.getProvinceByGemeente(gemeente);
            gemeente = province;
        }

        this.gemeentes.push( gemeente );
        this.emit('change');
    },

    addProvince : function(province) {

    },

    bindEventHandlers : function() {
        var self = this;

        this.$el.on('click', '.filter_gemeente', function() {
            var gemeente = $(this).data('gemeente');
            self.remove(gemeente);
        });
    },

    getPlaces : function() {
        return _.clone(this.places);
    },

    render : function() {
        var places = this.places.map(function(place) {
            return {
                theme : app.getCurrPageName(),
                name : place
            }
        });

        var html = this.tmpl({ gemeentes : places });
        this.$el.html(html);
    },

    remove : function(gemeente) {
        // We don't delete Nederland
        if (gemeente === 'Nederland') {
            return;
        }

        this.gemeentes = _.without(this.gemeentes, gemeente);

        // Check if this is not empty
        if (!this.gemeentes.length) {
            this.gemeentes = INIT_GEMEENTES;
        }

        this.emit('change');
    }
});