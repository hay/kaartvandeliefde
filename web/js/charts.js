window.Charts = Stapes.subclass({
    constructor : function(el, datastore, themes) {
        this.$el = $(el);
        this.data = datastore;
        this.answers = [];
        this.filters = {};
        this.themes = themes;
        this.maps = {};
        this.places = INIT_PLACES;

        var tmplTheme = $("#tmpl-theme").html();
        this.tmplTheme = Handlebars.compile(tmplTheme);
    },

    // This is all really basic right now
    calculateAnswer : function(question, place, opts) {
        // Always populate answers array with zeroes
        var answersLength;

        if (opts.labels) {
            answersLength = opts.labels.length;
        } else if (opts.type === 'bar') {
            answersLength = 5;
        } else if (opts.type === 'pie') {
            answersLength = 2;
        }

        var answers = _.range(answersLength).map(function(d) { return 0; });
        var population = 0;

        this.answers.forEach(function(record) {
            var zip = record.filters.zip;
            var inPlace = this.data.isZip(zip, place);

            if (record.answers[question] !== null && inPlace) {
                var answer = record.answers[question];
                population++;

                var index = opts.indexer ? opts.indexer(answer) : parseInt(answer - 1, 10);

                if (!!answers[index]) {
                    answers[index]++;
                } else {
                    answers[index] = 1;
                }
            }
        }, this);

        // Check if we actually have values
        var total = answers.reduce(function(a, b) {
            return a + b;
        });

        if (total === 0) {
            throw new Error("[Charts.js] no values at all");
        }

        return {
            data : this.convertToPercentage(answers),
            population : population
        };
    },

    convertToPercentage : function(row) {
        // First get the total
        var sum = row.reduce(function(a, b) {
            return a + b;
        }, 0);

        return row.map(function(val) {
            return val / sum;
        });
    },

    destroyChart : function(el) {
        $(el).html('').parent().find('.quote').html('');
    },

    setAnswers : function() {
        this.answers = this.data.query(this.filters);
    },

    getCurrentChart : function() {
        return this.currentChart;
    },

    getQuote : function(quote) {
        var l = this.places.length;
        var places = _.pluck(this.places, 'label');

        if (l === 1) {
            places = places[0];
        } else if (l === 2) {
            places = places.join(' en ');
        } else {
            places = places.slice(0, -1).join(', ') + ' en ' + places.pop();
        }

        return quote.replace('%s', places);
    },

    setup : function() {
        _.each(this.themes, function(theme) {
            var themeHtml = this.tmplTheme( theme );
            this.$el.append( themeHtml );
        }, this);

        this.setAnswers();
    },

    renderChart : function(el) {
        this.currentChart = el;
        this.destroyChart( this.getCurrentChart() );
        var $el = $(el);
        var themeId = $el.data('theme');
        var index = $el.data('index');

        if (!themeId) {
            return;
        }

        var chartOpts = this.themes[themeId].charts[index];

        var quote = this.getQuote(chartOpts.text);
        $el.parent().find('.quote').text(quote);

        var question = chartOpts.question;

        var columns = this.places.map(function(place) {
            var answer = this.calculateAnswer(question, place, chartOpts);
            var placeLabel = this.data.getPlaceLabel(place);

            var column = answer.data;
            column.unshift(placeLabel + ' (' + answer.population + ')');
            return column;
        }, this);

        try {
            if (chartOpts.type === 'bar') {
                var labels = chartOpts.labels ? chartOpts.labels : ['Helemaal niet', 'Nee', 'Misschien', 'Ja', 'Heel erg'];

                var chart = new BarChart(el, {
                    columns : columns,
                    labels : labels,
                    themeId : themeId
                });

                chart.show();
            }

            if (chartOpts.type === 'pie') {
                if (chartOpts.labels) {
                    var labels = chartOpts.labels;
                } else if (columns[0].length === 3) {
                    var labels = ["Ja", "Nee"];
                } else if (columns[0].length === 4) {
                    var labels = ["Nee", "Misschien", "Ja"];
                }

                var chart = new PieChart(el, {
                    columns : columns,
                    labels : labels,
                    themeId : themeId
                });
            }
        } catch (e) {
            throw e;
            this.showError(el);
            return;
        }
    },

    showError : function( el ) {
        el = el || this.currentChart;
        $(el).html('<img src="img/icon-404.png">');
    },

    renderMap : function(el) {
        var $el = $(el);
        var themeId = $el.data('theme');
        var theme = this.themes[themeId];

        if (this.maps[themeId]) {
            return;
        }

        var map = new GeoMap(this.data.gemeentes, $el.get(0), theme.color);
        this.maps[themeId] = map;

        map.on('gemeenteselect', function(gemeente) {
            this.emit('gemeenteselect', gemeente);
        }, this);
    },

    setFilters : function(filters) {
        this.filters = filters;
    },

    setPlaces : function(places) {
        this.places = places;
    }
})