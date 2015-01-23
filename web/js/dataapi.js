var API = {};

API.getData = function(questions){
    var newData = new Array();
    var questions = (typeof questions == "string")? [questions] : questions;

    API.loadedData.forEach(function(d){
        questions.forEach(function(i){
            var question = i;
            if (parseInt(d[question]) != 99999){
                var entry = [];
                entry.push(parseInt(d[question]));
                entry.push(parseInt(d[GESLACHT])-1);

                var leeftijd = parseInt(d[LEEFTIJD]);
                if (leeftijd < 20){
                    entry.push(0);
                } else if (leeftijd < 25){
                    entry.push(1);
                } else if (leeftijd < 30){
                    entry.push(2);
                } else if (leeftijd < 35){
                    entry.push(3);
                } else {
                    entry.push(4);
                }

                var status = parseInt(d[STATUS]);
                if (status <= 3){
                    entry.push(0);
                } else {
                    entry.push(1);
                }

                entry.push(parseInt(d[GEAARDHEID]-1));

                entry.push(parseInt(d[GELOOF]-1));

                entry.push(parseInt(d[INKOMEN])-1);
                entry.push(parseInt(d[PROVINCIE])-1);
                var pc = parseInt(d[POSTCODE]);
                entry.push(pc);
                entry.push(PostalCodeToGemeenteID(pc));

                newData.push(entry);
            }
        });
    });

    return (new API.data(newData, questions));
}

API.data = function(data, questions){
    this.rawData = data || [];
    this.questions = questions || "";
}

API.data.prototype = {
    data: function(){
        var final = new Array();

        this.rawData.forEach(function(d){
            final.push(d[0]);
        });

        return final;
    },

    count: function(){
        var dd = new Array();
        var final = new Array();

        this.rawData.forEach(function(d){
            dd.push(d[0]);
        });

        final = countData(dd);

        return final;
    },

    countByPostalCode: function(){
        var final = new Array();
        var names = new Array();
        var values = new Array();

        this.rawData.forEach(function(d){
            var pc = d[8];

            if (names.indexOf(pc) == -1){
                names.push(pc);
                values[names.indexOf(pc)] = [d[0]];
            } else {
                values[names.indexOf(pc)].push(d[0]);
            }
        });

        for (var i=0; i<names.length; i++){
            final.push([names[i], countData(values[i])]);
        }

        return final;
    },

    countByProvince: function(){
        var final = new Array();
        var names = new Array();
        var values = new Array();

        this.rawData.forEach(function(d){
            var pv = d[7];

            if (names.indexOf(pv) == -1){
                names.push(pv);
                values[names.indexOf(pv)] = [d[0]];
            } else {
                values[names.indexOf(pv)].push(d[0]);
            }
        });

        for (var i=0; i<names.length; i++){
            final.push([names[i], countData(values[i])]);
        }

        return final;
    },

    countByGemeente: function(){
        var final = new Array();
        var names = new Array();
        var values = new Array();

        this.rawData.forEach(function(d){
            var pc = d[8];

            var pc_naam = PostalCodeToGemeente(parseInt(pc));

            if (names.indexOf(pc_naam) == -1){
                names.push(pc_naam);
                values[names.indexOf(pc_naam)] = [d[0]];
            } else {
                values[names.indexOf(pc_naam)].push(d[0]);
            }
        });

        for (var i=0; i<names.length; i++){
            final.push([names[i], countData(values[i])]);
        }

        return final;
    },

    filter: function(filter, values){
        var final = new Array();
        var v = (typeof values == 'number')? [values]:values;
        var f;

        switch(filter.toLowerCase()){
            case "geslacht":
                f = 1;
                break;
            case "leeftijd":
                f = 2;
                break;
            case "status":
                f = 3;
                break;
            case "geaardheid":
                f = 4;
                break;
            case "geloof":
                f = 5;
                break;
            case "inkomen":
                f = 6;
                break;
            case "gemeente":
                f = 9;
                break;
            default:
                break;
        }

        this.rawData.forEach(function(d){
            if (f){
                if (v.indexOf(d[f]) != -1){
                    final.push(d);
                }
            }
        });

        return (new API.data(final, this.questions));
    },

    countobj: function(gemeenteID){
        if (!gemeenteID){
            var names;

            if (this.questions){
                this.questions.forEach(function(e){
                    var index = answers_q.indexOf(e);
                    if (index != -1){
                        names = answers_name[index];
                    }
                });
            }

            var count = this.count();
            var final = [];

            for (var i=0; i<count.length; i++){
                var name = (names)? names[count[i][0]-1] : count[i][0];
                final.push({name: name, value: count[i][1]});
            }

            return final;
        }
    },

    countObjGemeente: function(){
        var gem_id = [];
        var data = [];
        var final = [];

        for (var i=0; i<this.rawData.length; i++){
            var d = this.rawData[i][0];
            var g = this.rawData[i][9];
            var index = gem_id.indexOf(g);

            if (index == -1){
                gem_id.push(g);
                data.push([d]);
            } else {
                data[index].push(d);
            }
        }

        for (var i=0; i<gem_id.length; i++){
            final.push({gemeente: gem_id[i], data: data[i]});
        }

        return final;
    },

    getGemeentesWithData: function(){
        var final = [];
        this.rawData.forEach(function(d){
            if (final.indexOf(d[9]) == -1 && d[9] != -1){
                final.push(d[9]);
            }
        });

        return final;
    },

    countObjGemeenteLatLong: function(){
        var gem_id = [];
        var data = [];
        var final = [];

        for (var i=0; i<this.rawData.length; i++){
            var d = this.rawData[i][0];
            var g = this.rawData[i][9];
            var index = gem_id.indexOf(g);

            if (index == -1){
                gem_id.push(g);
                data.push([d]);
            } else {
                data[index].push(d);
            }
        }

        for (var i=0; i<gem_id.length; i++){
            if (gem_id[i] != -1){
                var longlat = gem_longlat[gem_id[i]];
                final.push({gemeente: gem_id[i], data: data[i], amount: data[i].length, latlong: [parseFloat(longlat[1]), parseFloat(longlat[0])]});
            }
        }

        return final;
    },
}