window.Gemeentes = Stapes.subclass({
    constructor : function(el) {
        this.$el = $(el);
        this.gemeentes = ['Nederland'];
        this.tmpl = Handlebars.compile( $("#tmpl-gemeentes").html() );
        this.bindEventHandlers();
    },

    add : function(gemeente) {
        this.gemeentes.unshift( gemeente );
        this.emit('change');
    },

    bindEventHandlers : function() {
        var self = this;

        this.$el.on('click', 'filter_gemeente', function() {
            self.emit('delete', $(this).data('gemeente'));
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
    }
});