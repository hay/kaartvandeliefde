window.DataStore = Stapes.subclass({
    constructor : function(filename) {
        this.filename = filename;
    },

    _createZipIndexes : function() {
        this.gemeentes = {};
        this.zips = {};

        this.data.zip.forEach(function(item) {
            var gemeente = item.gemeente;
            var zip = item.postcode;

            if (this.gemeentes[gemeente]) {
                this.gemeentes[gemeente].postcode.push(zip);
            } else {
                var gemeenteData = _.clone(item);
                gemeenteData.postcode = [zip];
                gemeenteData.respondents = 0;
                this.gemeentes[gemeente] = gemeenteData;
            }

            this.zips[zip] = gemeente;
        }, this);

        // Add respondents as well
        this.data.survey.forEach(function(survey) {
            _.each(this.gemeentes, function(gemeente) {
                if (gemeente.postcode.indexOf(survey.filters.zip) !== -1) {
                    gemeente.respondents++;
                }
            });
        }, this);
    },

    load : function(cb) {
        var self = this;

        d3.json(this.filename, function(data) {
            self.data = data;
            self._createZipIndexes();
            cb();
        });
    },

    // We could expand filters to also include answers, so we can actually
    // see, for example, which gemeentes have the most bedpartners or something
    query : function(filters) {
        return this.data.survey.filter(function(record) {
            for (var key in filters) {
                var check = false;
                var filterValue = filters[key];
                var recordValue = record.filters[key];

                if (typeof value === 'function') {
                    check = filterValue( recordValue );
                } else {
                    check = filterValue === recordValue;
                }

                if (!check) {
                    return false;
                }
            }

            return true;
        });
    }
});