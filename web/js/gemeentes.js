window.Gemeentes = Stapes.subclass({
    BLESSED : [
        "Utrecht",
        "Groningen",
        "Amsterdam",
        "Tilburg",
        "Breda",
        "Rotterdam",
        "Nijmegen",
        "'s-Hertogenbosch",
        "Leeuwarden",
        "Eindhoven",
        "'s-Gravenhage",
        "Enschede",
        "Zwolle",
        "Maastricht",
        "Amersfoort",
        "Almere",
        "Deventer",
        "Leiden"
    ],

    constructor : function(el) {
        this.$el = $(el);
        this.gemeentes = ['Nederland'];
        this.tmpl = Handlebars.compile( $("#tmpl-gemeentes").html() );
        this.bindEventHandlers();
    },

    add : function(gemeente) {
        // Make sure we don't add stuff that's already there
        if (this.gemeentes.indexOf(gemeente) !== -1) {
            return;
        }

        // Maximum number of gemeentes
        if (this.gemeentes.length === 3) {
            return;
        }

        // If this gemeente is not blessed, get the province
        if (this.BLESSED.indexOf(gemeente) === -1) {
            var province = window.datastore.getProvinceByGemeente(gemeente);
            gemeente = province;
        }

        this.gemeentes.push( gemeente );
        this.emit('change');
    },

    bindEventHandlers : function() {
        var self = this;

        this.$el.on('click', '.filter_gemeente', function() {
            var gemeente = $(this).data('gemeente');
            self.remove(gemeente);
        });
    },

    getGemeentes : function() {
        return _.clone(this.gemeentes);
    },

    render : function() {
        var gemeentes = this.gemeentes.map(function(gemeente) {
            return {
                theme : app.getCurrPageName(),
                name : gemeente
            }
        });

        var html = this.tmpl({ gemeentes : gemeentes });
        this.$el.html(html);
    },

    remove : function(gemeente) {
        // We don't delete Nederland
        if (gemeente === 'Nederland') {
            return;
        }

        this.gemeentes = _.without(this.gemeentes, gemeente);

        this.emit('change');
    }
});