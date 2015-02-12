window.Charts = Stapes.subclass({
    constructor : function(el, datastore, themes) {
        this.$el = $(el);
        this.data = datastore;
        this.answers = [];
        this.filters = {};
        this.themes = themes;
        this.maps = {};
        this.gemeentes = INIT_PLACES;

        var tmplTheme = $("#tmpl-theme").html();
        this.tmplTheme = Handlebars.compile(tmplTheme);
    },

    // This is all really basic right now
    calculateAnswer : function(question, gemeente, opts) {
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
            var inGemeente = this.data.isZip(zip, gemeente) || gemeente === 'Nederland';

            if (record.answers[question] !== null && inGemeente) {
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
        var l = this.gemeentes.length;
        var gemeentes = _.clone(this.gemeentes);

        if (l === 1) {
            gemeentes = gemeentes[0];
        } else if (l === 2) {
            gemeentes = gemeentes.join(' en ');
        } else {
            gemeentes = gemeentes.slice(0, -1).join(', ') + ' en ' + gemeentes.pop();
        }

        return quote.replace('%s', gemeentes);
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

        var columns = this.gemeentes.map(function(gemeente) {
            var answer = this.calculateAnswer(question, gemeente, chartOpts);

            var column = answer.data;
            column.unshift(gemeente + ' (' + answer.population + ')');
            return column;
        }, this);

        try {
            if (chartOpts.type === 'bar') {
                var labels = chartOpts.labels ? chartOpts.labels : ['Helemaal niet', 'Nee', 'Misschien', 'Ja', 'Heel erg'];

                var chart = new BarChart(el, {
                    columns : columns,
                    labels : labels
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
                    labels : labels
                });
            }
        } catch (e) {
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

    setGemeentes : function(gemeentes) {
        this.gemeentes = gemeentes;
    }
})