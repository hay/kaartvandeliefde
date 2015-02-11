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
        var html = [];

        this.gemeentes.forEach(function(place) {
            html.push('<option class="item" value="' + place + '">' + place + '</option>');
        });

        // TODO: REMOVE ASAP
        for (var city in PROVINCE_CITIES) {
            var province = PROVINCE_CITIES[city];
            html.push('<option class="item" value="' + city + '">' + province + '</option>');
        }

        html = '<select><option value="ignore">Klik hier</option>' + html.join('') + '</select>';

        this.$el.html(html);
    },

    select : function(place) {
        this.$el.find("option").removeAttr('selected');
        this.$el.find("option[value=" + place + "]").attr('selected', 'selected');
    }
});