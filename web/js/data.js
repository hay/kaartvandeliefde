window.FILTERS = [
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
                label : "Homo / Lesbisch / Biseksueel",
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
        "color": "#F21933",
        "charts": [
            {
                "type" : "bar",
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
                "type": "bar",
                "question": "V087_2",
                "category" : "Voor de rest van je leven",
                "text" : "Denkt deze generatie in %s voor de rest van hun leven bij hun huidige partner te blijven?"
            },
            {
                "type": "bar",
                "question": "V086_4",
                "category" : "Huidige partner vs ideaalbeeld",
                "text" : "Voldoet de huidige partner van deze generatie in %s aan hun ideaalbeeld?"
            },
            {
                "type": "bar",
                "question": "V084_3-V085_3",
                "category" : "Carrière boven relatie",
                "text" : "Verkiest deze generatie in %s een carrière boven een relatie?"
            },
            {
                "type" : "pie",
                "question" : "V073",
                "category" : "Kinderen",
                "text" : "Wil deze generatie in %s kinderen krijgen?",
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
                    "De relatie gaf me meer verdriet dan vreugde",
                    "Vanwege seksuele verschillen",
                    "Vanwege ontrouw van mijn partner",
                    "Vanwege ontrouw van mij",
                    "Vanwege verlangen naar een ex-partner",
                    "Door een verkeerde of onrealistische partnerkeuze en idealen",
                    "Mijn omgeving was tegen mijn relatie",
                    "Vanwege verschillende toekomstbeelden",
                    "N.v.t. (ik ben nog steeds in mijn eerste relatie)",
                    "Anders",
                ]
            }
        ]
    },
    "lust": {
        "color": "#FFAA00",
        "charts": [
            {
                "type": "bar",
                "question" : "V082-V122",
            "category" : "Aantal bedpartners",
                "text" : "Hoeveel bedpartners heeft men gehad in %s?",
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
                "type": "bar",
                "question": "V025_4-V052_4",
                "category" : "Zijn liefde en seks hetzelfde?",
                "text" : "Ziet men liefde en seks als hetzelfde in %s?"
            },
            {
                "type": "bar",
                "question": "V025_1-V052_1",
                "category" : "Liever seks dan relatie",
                "text" : "Heeft men liever seks dan een relatie in %s?"
            },
            {
                "type": "pie",
                "question": "V024_1-V051_1",
                "category" : "Vreemdgaan",
                "text" : "Is men wel eens vreemdgegaan in %s?"
            },
            {
                "type": "pie",
                "question": "V024_2-V051_2",
                "category" : "Vreemdgaan met toestemming",
                "text" : "Hoe vaak gaat men vreemd met toestemming in %s?"
            },
            {
                "type": "bar",
                "question": "V023_3",
                "category" : "Seksuele tevredenheid",
                "text" : "Is men seksueel tevreden met de huidige partner in %s?"
            }
        ]
    },
    "angst": {
        "color": "#19C0D1",
        "charts": [
            {
                "type": "bar",
                "question": "V053_3",
                "category" : "Bindingsangst",
                "text" : "Heeft men last van bindingsangst in %s?"
            },
            {
                "type": "pie",
                "question": "V053_1",
                "category" : "Angst om alleen te blijven",
                "text" : "Is men bang om alleen te blijven in %s?"
            },
            {
                "type": "bar",
                "question": "V053_2",
                "category" : "Ontevreden of alleen?",
                "text" : "Is men in %s liever ontevreden in een relatie dan vrijgezel?"
            },
            {
                "type": "bar",
                "question": "V013_1-V048_1",
                "category" : "Date vinden makkelijk",
                "text" : "Hoe makkelijk is het in %s om een date te krijgen?"
            },
            {
                "type": "bar",
                "question": "V013_2-V048_2",
                "category" : "Serieuze relatie vinden makkelijk",
                "text" : "Hoe gemakkelijk is het in %s om een serieuze relatie te krijgen?"
            },
            {
                "type": "bar",
                "question": "V027_5",
                "category" : "Angst voor andere liefde partner",
                "text" : "Hoe bang is men in %s dat hun partner verliefd wordt op een ander?"
            },
            {
                "type": "bar",
                "question": "V027_4",
                "category" : "Wanhopig bij verlaten partner",
                "text" : "Hoe wanhopig is men in %s als hun partner hen verlaat?"
            },
            {
                "type": "bar",
                "question": "V027_1",
                "category" : "Angst om alleen achter te blijven",
                "text" : "Hoe bang is men in %s dat ze allen achterblijven na een relatie?"
            },
            {
                "type": "bar",
                "question": "V027_2",
                "category" : "Relatie alleen tegen eenzaamheid",
                "text" : "Houdt men in %s alleen maar de relatie in stand om niet alleen te zijn?"
            }
        ]
    }
};