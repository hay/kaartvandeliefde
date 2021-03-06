window.CHART_COLORS = ['%theme', '#3F3F3F', '#929292', '#bbb'];

window.THEME_COLORS = {
    "liefde" : ["#E53423", "#7F1D16", "#E5A6A0"],
    "lust"   : ["#E5C522", "#7F6E1C", "#E5DAA0"],
    "angst"  : ["#52BFD5", "#166E80", "#9FD6E2"]
};

window.INIT_PLACES = [{ label : "Nederland", type : "country" }];

window.BLESSED_GEMEENTES = [
    "'s-Gravenhage",
    "'s-Hertogenbosch",
    "Almere",
    "Amersfoort",
    "Amsterdam",
    "Breda",
    "Deventer",
    "Eindhoven",
    "Enschede",
    "Groningen",
    "Leeuwarden",
    "Leiden",
    "Maastricht",
    "Nijmegen",
    "Rotterdam",
    "Tilburg",
    "Utrecht",
    "Zwolle"
];

window.PROVINCES = [
    "Drenthe",
    "Flevoland",
    "Friesland",
    "Gelderland",
    "Groningen",
    "Limburg",
    "Noord-Brabant",
    "Noord-Holland",
    "Overijssel",
    "Utrecht",
    "Zeeland",
    "Zuid-Holland"
];

window.FILTERS = [
    {
        "name" : "Locatie",
        "key" : "place",
        "place" : true,
        "values" : INIT_PLACES
    },
    {
        "name" : "Geslacht",
        "key" : "sex",
        "values" : [
            { label : "Man", value : "male"},
            { label : "Vrouw", value : "female"},
        ]
    },
    {
        "name" : "Leeftijd",
        "key" : "age",
        "values" : [
            { label : "&lt; 21", value: function(d) { return d > 16 && d < 22; } },
            { label: "21-27", value: function(d) { return d > 21 && d < 28; } },
            { label: "&gt; 27", value:function(d) { return d > 27 && d < 40; } }
        ]
    },
    {
        "name" : "Status",
        "key" : "relation",
        "values" : [
            { label: "Vrijgezel", value: "single" },
            { label: "In een relatie", value: "relation" }
        ]
    },
    {
        "name" : "Geaardheid",
        "key" : "orientation",
        "values" : [
            {
                label : "Hetero",
                value: function(d) {
                    return d === 'hetero';
                }
            },
            {
                label : "Homo / Bi",
                value : function(d) {
                    return ['gay', 'bi'].indexOf(d) !== -1;
                }
            }
        ]
    },
    {
        "name" : "Geloof",
        "key"  : "religion",
        "values" : [
            {
                label : "Gelovig",
                value : function(d) {
                    return ['other', 'atheist'].indexOf(d) === -1;
                }
            },
            {
                label : "Niet-gelovig",
                value : function(d) {
                    return ['other', 'atheist'].indexOf(d) !== -1;
                }
            }
        ]
    }
];

// All filters are selected by default
window.FILTERS = window.FILTERS.map(function(filter) {
    filter.values = filter.values.map(function(value) {
        value.selected = true;
        return value;
    });

    return filter;
});

window.THEMES = {
    "liefde": {
        "themeId" : "liefde",
        "color": "#F21933",
        "charts": [
            {
                "type" : "pie",
                "question" : "C1",
                "category" : "Gelukkig in de liefde",
                "text" : "Is deze generatie in %s gelukkig in de liefde?",
                "labels" : ["Nee", "Weet niet", "Ja"]
            },
            {
                "type" : "bar",
                "question" : "V010",
                "category" : "Aantal relaties",
                "text" : "Hoeveel serieuze relaties heeft deze generatie in %s gehad?",
                "labels" : ["Geen", "1", "2 - 3", "4 - 5", "Meer dan vijf"],
                "indexer" : function(d) {
                    if (d === 0) return 0;
                    if (d < 2) return 1;
                    if (d < 4) return 2;
                    if (d < 6) return 3;
                    if (d > 5) return 4;
                }
            },
            {
                "type" : "bar",
                "question" : "V076",
                "category" : "First date",
                "text" : "Wat is volgens deze generatie in %s de beste plek om een partner te ontmoeten?",
                "labels" : ["Online", "In de kroeg", "Via vrienden", "Via een hobby", "Anders"]
            },
            {
                "type" : "bar",
                "question" : "V038",
                "category" : "Ideaalbeeld relatie",
                "text" : "Wat vindt deze generatie in %s het belangrijkst in een relatie?",
                "labels" : [
                    "Vriendschap",
                    "Gelijkwaardigheid",
                    "Betrouwbaarheid",
                    "Gelijkgezindheid",
                    "Seksuele bevrediging",
                    "Goede communicatie",
                    "Aanpassingsvermogen",
                    "Zelfkennis"
                ]
            },
            {
                "type": "pie",
                "question": "V087_2",
                "category" : "Voor de rest van je leven",
                "text" : "Denkt deze generatie in %s voor de rest van hun leven bij hun huidige partner te blijven?"
            },
            {
                "type": "pie",
                "question": "V086_4",
                "category" : "Huidige partner vs ideaalbeeld",
                "text" : "Voldoet de huidige partner van deze generatie in %s aan hun ideaalbeeld?"
            },
            {
                "type": "pie",
                "question": "V084_3-V085_3",
                "category" : "Carrière boven relatie",
                "text" : "Verkiest deze generatie in %s een carrière boven een relatie?"
            },
            {
                "type" : "pie",
                "question" : "V065-V073",
                "category" : "Kinderen",
                "text" : "Wil deze generatie in %s kinderen krijgen?",
                "labels" : [
                    "Ja",
                    "Misschien",
                    "Nee",
                    "Weet ik (nog) niet"
                ]
            },
            {
                "type": "pie",
                "question": "V075",
                "category" : "Kinderen vs relatie",
                "text" : "Zou deze generatie in %s de relatie beëindigen als hun partner geen kinderen wil?"
            },
            {
                "type" : "pie",
                "question" : "V074",
                "category" : "Kinderen zonder relatie",
                "text" : "Zou deze generatie in %s kinderen nemen zonder relatie?"
            },
            {
                "type" : "bar",
                "question" : "V089",
                "category" : "Break-up",
                "text" : "Wat is voor deze generatie in %s de belangrijkste reden om een relatie te beëindigen?",
                "labels" : [
                    "Relatie gaf meer verdriet dan vreugde",
                    "Seksuele verschillen",
                    "Ontrouw van mijn partner",
                    "Ontrouw van mij",
                    "Verlangen naar ex-partner",
                    "Verkeerde partnerkeuze en/of idealen",
                    "Omgeving was tegen",
                    "Verschillende toekomstbeelden",
                    "N.v.t. (in eerste relatie)",
                    "Anders",
                ]
            }
        ]
    },
    "lust": {
        "themeId" : "lust",
        "color": "#FFAA00",
        "charts": [
            {
                "type": "bar",
                "question" : "V082-V122",
                "category" : "Aantal bedpartners",
                "text" : "Hoeveel bedpartners heeft deze generatie in %s gehad?",
                "indexer" : function(d) {
                    if (d < 6) return 0;
                    if (d < 11) return 1;
                    if (d < 21) return 2;
                    if (d < 31) return 3;
                    return 4;
                },
                "labels" : ["Minder dan 5", "5 - 10", "10 - 20", "20 - 30", "Meer dan 30"]
            },
            {
                "type" : "pie",
                "question" : "V025_4-V052_4",
                "category" : "Liefde vs seks",
                "text" : "Vindt deze generatie in %s liefde en seks twee verschillende dingen?"
            },
            {
                "type" : "pie",
                "question" : "V023_1-V050",
                "category" : "Seksuele tevredenheid",
                "text" : "Is deze generatie in %s tevreden met zijn huidige seksleven?"
            },
            {
                "type" : "pie",
                "question" : "V025_2-V052_2",
                "category" : "Seks & relatie",
                "text" : "Vindt deze generatie in %s seks beter als je in een relatie zit?"
            },
            {
                "type": "pie",
                "question": "V024_1-V051_1",
                "category" : "Vreemdgaan",
                "text" : "Is deze generatie in %s wel eens vreemdgegaan?"
            },
            {
                "type" : "bar",
                "question" : "V083",
                "category" : "Afspraken",
                "text" : "Wat voor soort afspraken maakt deze generatie in %s rond seks buiten de relatie?",
                "labels" : [
                    "Geen afspraken",
                    "Afgesproken niet vreemd te gaan",
                    "Vreemdgaan mag, maar wel samen",
                    "Vreemdgaan mag, maar nooit vertellen",
                    "Vreemdgaan mag, maar alleen zoenen",
                    "Vreemdgaan mag, maar alleen met het eigen geslacht",
                    "Anders"
                ]
            }
        ]
    },
    "angst": {
        "themeId" : "angst",
        "color": "#19C0D1",
        "charts": [
            {
                "type": "pie",
                "question": "V053_3",
                "category" : "Bindingsangst",
                "text" : "Is deze generatie in %s bang om zich te binden?"
            },
            {
                "type": "pie",
                "question": "V013_2-V048_2",
                "category" : "Vinden serieuze partner",
                "text" : "Vindt deze generatie in %s het gemakkelijk om een serieuze partner te vinden?"
            },
            {
                "type": "pie",
                "question": "V053_1",
                "category" : "Alleen blijven singles",
                "text" : "Zouden de singles van deze generatie in %s het erg vinden om nooit een serieuze relatie te vinden?"
            },
            {
                "type": "pie",
                "question": "V027_1",
                "category" : "Alleen blijven na relatie",
                "text" : "Is deze generatie in %s bang om na hun huidige relatie alleen te blijven?"
            },
            {
                "type": "pie",
                "question": "V053_2",
                "category" : "Ontevreden vs relatie",
                "text" : "Is deze generatie in %s liever ontevreden in een relatie dan vrijgezel?"
            },
            {
                "type" : "pie",
                "question" : "V013_4",
                "category" : "Kwetsbaarheid",
                "text" : "Durft deze generatie in %s zijn zwaktes te laten zien?"
            },
            {
                "type": "pie",
                "question": "V027_5",
                "category" : "Verliefd op een ander",
                "text" : "Is deze generatie in %s bang dat hun partner verliefd wordt op een ander?"
            },
            {
                "type": "pie",
                "question": "V027_4",
                "category" : "Einde van de wereld",
                "text" : "Stort de wereld van deze generatie in %s in als hun partner hen zou verlaten?"
            }
        ]
    }
};