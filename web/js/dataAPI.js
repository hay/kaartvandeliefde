//window.API = (function() {
var API = {};

var GESLACHT = "V002", LEEFTIJD = "V003", STATUS = "V012", GEAARDHEID = "V008", GELOOF = "V067", INKOMEN = "V007", PROVINCIE = "V005", POSTCODE = "V088", GEMEENTEID;
//             1,2                0-4              0,1                  1,2,3             0,1               1,2,3               1-13               open          open

var postcodes;

var gem_name = [];
var usedgem_name = [];
var gem_pc = [];
var gem_longlat = []; 
var awnsers_q = [];
var awnsers_name = [];

API.loadData = function(link_data, link_pc, link_awnsers, fn){
    d3.csv(link_data, function(error, data){
        API.loadedData = data;
        
        d3.csv(link_pc, function(error, data){
            API.postalCodes = data;
            d3.csv(link_awnsers, function(error, data){
                API.awnsers = data;
                loadPostalCodes(fn);
            });
        });
    });
}

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
                    var index = awnsers_q.indexOf(e);
                    if (index != -1){
                        names = awnsers_name[index];
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

function countData(data){
    var names = new Array();
    var counts = new Array();
    var final = new Array();

    data.forEach(function(d){
        if (names.indexOf(d) == -1){
            names.push(d);
            counts[names.indexOf(d)] = 1;
        } else {
            counts[names.indexOf(d)] += 1;
        }
    });

    for (var i=0; i<names.length; i++){
        final.push([parseInt(names[i]), parseInt(counts[i])]);
    }
    
    final.sort(sortFunction);

    return final;
}

function sortFunction(a, b){
    var valueA, valueB;

    valueA = a[0]; // Where 1 is your index, from your example
    valueB = b[0];
    if (valueA < valueB) {
        return -1;
    }
    else if (valueA > valueB) {
        return 1;
    }
    return 0;
}

function PostalCodeToGemeente(PC){
    var index = gem_pc.indexOf(PC);
    if (index != -1){
        return gem_name[index];
    } else {
        return "fout";
    }
}

function PostalCodeToGemeenteID(PC){
    var index = gem_pc.indexOf(PC);
    var name = gem_name[index];
    var id = gem_name.indexOf(name);
    return id;
}

function loadPostalCodes(fn_done){
    API.postalCodes.forEach(function(d){
        var pc = parseInt(d["postcode"]);
        if (gem_pc.indexOf(pc) == -1){
            gem_pc.push(pc);
            gem_name.push(d["gemeente"]);
            gem_longlat.push([d["lon"], d["lat"]]);
        }
    });
    console.log("klaar");
    
    loadAwnsers(fn_done);
}
    
function loadAwnsers(fn_done){
    API.awnsers.forEach(function(d){
        awnsers_q.push(d["Question"]);
        var names = [];
        names.push(d["Answer1"]);
        names.push(d["Answer2"]);
        names.push(d["Answer3"]);
        names.push(d["Answer4"]);
        names.push(d["Answer5"]);
        awnsers_name.push(names);
    });
    
    fn_done();
}

API.getGemeenteFromID = function(ID){
    if (ID > -1 && ID < gem_name.length){
        return gem_name[ID];
    }
}

API.getIDFromGemeente = function(gemeente){
    return gem_name.indexOf(gemeente);
}