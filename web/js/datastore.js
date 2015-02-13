window.DataStore = Stapes.subclass({
    constructor : function(filename) {
        this.filename = filename;
    },

    _createZipIndexes : function() {
        this.gemeentes = {};
        this.zips = {};

        this.data.zip.forEach(function(item) {
            var gemeente = item.gemeente;
            var province = item.province;
            var zip = item.postcode;

            if (this.gemeentes[gemeente]) {
                this.gemeentes[gemeente].postcode.push(zip);
            } else {
                var gemeenteData = _.clone(item);
                gemeenteData.postcode = [zip];
                gemeenteData.respondents = 0;
                this.gemeentes[gemeente] = gemeenteData;
            }

            this.zips[zip] = {
                gemeente : gemeente,
                province : province
            };
        }, this);
    },

    _addRespondents : function() {
        // Add respondents as well
        this.data.survey.forEach(function(survey) {
            _.each(this.gemeentes, function(gemeente) {
                if (gemeente.postcode.indexOf(survey.filters.zip) !== -1) {
                    gemeente.respondents++;
                }
            });
        }, this);

        // Lose the gemeentes without respondents
        for (var gemeente in this.gemeentes) {
            if (this.gemeentes[gemeente].respondents === 0) {
                delete this.gemeentes[gemeente];
            }
        }
    },

    // Returns the 'correct' name
    getPlaceLabel : function(place) {
        if (['Utrecht', 'Groningen'].indexOf(place.label) !== -1) {
            var type = place.type === 'province' ? 'provincie' : 'gemeente';
            return place.label + ' (' + type + ')';
        } else {
            return place.label;
        }
    },

    getProvinceByGemeente : function(gemeente) {
        return this.gemeentes[gemeente].province;
    },

    isZip : function(zip, place) {
        var zipRecord = this.zips[zip];

        if (place.type === 'country') return true;

        if (!zipRecord) return false;

        return (zipRecord.gemeente === place.label && place.type === 'gemeente') ||
               (zipRecord.province === place.label && place.type === 'province');
    },

    load : function(cb) {
        var self = this;

        d3.json(this.filename, function(data) {
            self.data = data;
            self._createZipIndexes();
            self._addRespondents();
            cb();
        });
    },

    // We could expand filters to also include answers, so we can actually
    // see, for example, which gemeentes have the most bedpartners or something
    query : function(filters) {
        return this.data.survey.filter(function(record) {
            // We now run all the filters, all of them need to have at
            // least *one* matching value, so it's basically a
            // (x OR y) AND (x OR y) query

            var checks = filters.map(function(filter) {
                var recordValue = record.filters[filter.key];

                return filter.values.some(function(check) {
                    if (typeof check.value === 'function') {
                        return check.selected && check.value(recordValue);
                    } else {
                        return check.selected && check.value === recordValue;
                    }
                });
            });

            return checks.every(function(d) { return d; });
        });
    }
});