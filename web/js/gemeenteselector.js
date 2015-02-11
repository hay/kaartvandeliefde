window.GemeenteSelector = Stapes.subclass({
    constructor : function(el, data) {
        this.el = el;
        this.$el = $(el);
        this.provinces = data.provinces;
        this.gemeentes = data.gemeentes
        this.bindEventHandlers();
    },

    bindEventHandlers : function() {
        this.$el.on('change', function(e) {
            var val = $(e.target).val();

            if (val !== 'ignore') {
                this.emit('select', val);
            }
        }.bind(this));
    },

    render : function() {
        var places = this.gemeentes.concat(this.provinces);

        var html = places.map(function(place) {
            return '<option class="item" value="' + place + '">' + place + '</option>';
        });

        html = '<select><option value="ignore">Selecteer een gemeente of provincie</option>' + html.join('') + '</select>';

        this.$el.html(html);
    },

    select : function(place) {
        this.$el.find("option").removeAttr('selected');
        this.$el.find("option[value=" + place + "]").attr('selected', 'selected');
    }
});