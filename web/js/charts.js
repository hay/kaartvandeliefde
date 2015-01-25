window.Charts = Stapes.subclass({
    constructor : function(el, datastore, themes) {
        this.$el = $(el);
        this.data = datastore;
        this.answers = [];
        this.filters = {};
        this.themes = themes;

        var tmplTheme = $("#tmpl-theme").html();
        this.tmplTheme = Handlebars.compile(tmplTheme);
    },

    // This is all really basic right now
    calculateAnswer : function(question, type) {
        var answers = [];

        this.answers.forEach(function(record) {
            if (record.answers[question]) {
                var answer = record.answers[question];

                if (!!answers[answer - 1]) {
                    answers[answer - 1]++;
                } else {
                    answers[answer - 1] = 1;
                }
            }
        });

        return this.convertToPercentage(answers);
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

    getAnswers : function() {
        this.answers = this.data.query(this.filters);
    },

    setup : function() {
        _.each(this.themes, function(theme, themeId) {
            theme.themeId = themeId;
            var themeHtml = this.tmplTheme( theme );
            this.$el.append( themeHtml );
        }, this);

        this.setupMaps();
        this.getAnswers();
    },

    renderChart : function(el) {
        var $el = $(el);
        var themeId = $el.data('theme');
        var index = $el.data('index');
        var chartOpts = this.themes[themeId].charts[index];

        // TODO: combine multiple questions
        var question = chartOpts.questions[0];
        var answers = this.calculateAnswer(question, chartOpts.type);

        answers.unshift('Nederland');

        var chart = new BarChart(el, {
            columns : [answers],
            labels : ['Zeker niet', 'Nee', 'Misschien', 'Ja', 'Absoluut']
        });

        chart.show();
    },

    setupMaps : function() {
        // TODO: why does the map only appear after resizing?
        _.each(this.themes, function(theme, themeId) {
            var $el = $("." + themeId + ".contentHeader");
            var map = new GeoMap(this.data.gemeentes, $el, theme.color);

            map.on('gemeenteselect', function(gemeente) {
                this.emit('gemeenteselects', gemeente);
            }, this);
        }, this);
    }
})