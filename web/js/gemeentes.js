window.Gemeentes = Stapes.subclass({
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

        this.gemeentes.push( gemeente );
        console.log(gemeente, this.gemeentes);
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
        return this.gemeentes;
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
        console.log(gemeente);

        // We don't delete Nederland
        if (gemeente === 'Nederland') {
            return;
        }

        console.log(this.gemeentes);

        this.gemeentes = _.without(this.gemeentes, gemeente);

        console.log(this.gemeentes);

        this.emit('change');
    }
});