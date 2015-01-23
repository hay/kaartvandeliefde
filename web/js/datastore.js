window.DataStore = Stapes.subclass({
    constructor : function(filename) {
        this.filename = filename;
    },

    getCities : function() {
        return this.data.zip;
    },

    load : function(cb) {
        var self = this;

        d3.json(this.filename, function(data) {
            self.data = data;
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