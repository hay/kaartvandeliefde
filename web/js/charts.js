window.Charts = Stapes.subclass({
    constructor : function(el, datastore, themes) {
        this.$el = $(el);
        this.data = datastore;
        this.answers = [];
        this.filters = {};
        this.themes = themes;
        this.maps = {};
        this.gemeentes = ['Nederland'];
        this.currentChart = false;

        var tmplTheme = $("#tmpl-theme").html();
        this.tmplTheme = Handlebars.compile(tmplTheme);
    },

    // This is all really basic right now
    calculateAnswer : function(question, gemeente) {
        var answers = [];
        var population = 0;

        this.answers.forEach(function(record) {
            var zip = record.filters.zip;
            var inGemeente = this.data.zips[zip] === gemeente || gemeente === 'Nederland';

            if (record.answers[question] && inGemeente) {
                var answer = record.answers[question];
                population++;

                if (!!answers[answer - 1]) {
                    answers[answer - 1]++;
                } else {
                    answers[answer - 1] = 1;
                }
            }
        }, this);

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
        var gemeentes = this.gemeentes;

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
        _.each(this.themes, function(theme, themeId) {
            theme.themeId = themeId;
            var themeHtml = this.tmplTheme( theme );
            this.$el.append( themeHtml );
        }, this);

        this.setAnswers();
    },

    renderChart : function(el) {
        this.currentChart = el;
        var $el = $(el);
        var themeId = $el.data('theme');
        var index = $el.data('index');
        var chartOpts = this.themes[themeId].charts[index];

        var quote = this.getQuote(chartOpts.text);
        $el.parent().find('.quote').text(quote);

        // TODO: combine multiple questions
        var question = chartOpts.questions[0];

        var columns = this.gemeentes.map(function(gemeente) {
            var answer = this.calculateAnswer(question, gemeente);
            var column = answer.data;
            column.unshift(gemeente + ' (' + answer.population + ')');
            return column;
        }, this);

        try {
            if (chartOpts.type === 'bar') {
                var chart = new BarChart(el, {
                    columns : columns,
                    labels : ['Helemaal niet', 'Nee', 'Misschien', 'Ja', 'Heel erg']
                });

                chart.show();
            }

            if (chartOpts.type === 'pie') {
                var chart = new PieChart(el, {
                    columns : columns,
                    labels : ["Ja", "Nee"]
                });
            }
        } catch (e) {
            // TODO: data not ok
            $el.html('<img src="img/icon-404.png">');
            return;
        }
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