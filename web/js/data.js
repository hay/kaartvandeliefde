window.FILTERS = [
    {
        "name" : "Geslacht",
        "key" : "sex",
        "values" : [
            { label : "Man", value : "male", selected : true},
            { label : "Vrouw", value : "female", selected : true},
        ]
    },
    {
        "name" : "Leeftijd",
        "key" : "age",
        "values" : [
            { label : "&lt;20", value: function(d) { return d < 20; }, selected : true },
            { label: "20-25", value: function(d) { return d > 19 && d < 26; }, selected : true },
            { label: "25-30", value:function(d) { return d > 24 && d < 31; }, selected : true },
            { label: "30-35", value:function(d) { return d > 29 && d < 36; }, selected : true },
            { label: "&gt;35", value:function(d) { return d > 35; }, selected : true }
        ]
    },
    {
        "name" : "Status",
        "key" : "relation",
        "values" : [
            { label: "Vrijgezel", value: "single", selected : true},
            { label: "In een relatie", value: "relation", selected : true }
        ]
    },
    {
        "name" : "Geaardheid",
        "key" : "orientation",
        "values" : [
            { label : "Hetero", value: "hetero", selected : true },
            { label : "Homo / Lesbisch", value: "gay", selected : true },
            { label : "Biseksueel", value: "bi", selected : true }
        ]
    },
    {
        "name" : "Inkomen",
        "key" : "income",
        "values" : [
            { label : "Beneden modaal", value: "belowaverage", selected : true },
            { label : "Modaal", value: "average", selected : true },
            { label : "Boven modaal", value: "aboveaverage", selected : true }
        ]
    },
    {
        "name" : "Geloof",
        "key"  : "religion",
        "values" : [
            { label : "Katholiek", value: "catholic", selected : true },
            { label : "Protestants", value: "protestant", selected : true },
            { label : "Joods", value: "jewish", selected : true },
            { label : "Islamitisch", value: "islamic", selected : true },
            { label : "Overig", value: "other", selected : true },
            { label : "Niet gelovig", value: "atheist", selected : true }
        ]
    }
];

window.THEMES = {
    "liefde": {
        "color": "#F21933",
        "charts": [
            {
                "type": "pie",
                "questions": ["V028", "V054"],
                "category" : "Gelooft in ware liefde",
                "text" : "Gelooft men in %s in de ware liefde?"
            },
            {
                "type": "bar",
                "questions": ["V085_3", "V084_3"],
                "category" : "Carrière boven relatie",
                "text" : "Plaatst men in %s een carrière boven een relatie?"
            },
            {
                "type": "bar",
                "questions": ["V086_4"],
                "category" : "Huidige partner is ideaal",
                "text" : "Hoe ideaal vindt men de huidige partner in %s?"
            },
            {
                "type": "bar",
                "questions": ["V086_3"],
                "category" : "De ware liefde",
                "text" : "Hebben de mensen in %s de ware liefde gevonden?"
            },
            {
                "type": "bar",
                "questions": ["V086_2"],
                "category" : "Partner belangrijkste in het leven",
                "text" : "Is de partner in %s het belangrijkste in het leven?"
            },
            {
                "type": "bar",
                "questions": ["V087_2"],
                "category" : "Relatie voor het leven",
                "text" : "Blijven de mensen in %s de rest van hun leven bij hun huidige partner?"
            },
            {
                "type": "bar",
                "questions": ["V087_3"],
                "category" : "Partner en toekomstplannen",
                "text" : "Betrekt men in %s de partner bij de toekomstplannen?"
            },
            {
                "type": "pie",
                "questions": ["V075"],
                "category" : "Kinderwens en relatie",
                "text" : "Maakt men het uit in %s als de partner geen kinderen wilt?"
            },
            {
                "type": "bar",
                "questions": ["V023_3"],
                "category" : "Seksuele tevredenheid",
                "text" : "Is men seksueel tevreden met de huidige partner in %s?"
            }
        ]
    },
    "lust": {
        "color": "#FFAA00",
        "charts": [
            // We got to figure out something better for this question
            /*
            {
                "type": "bar",
                "questions" : ["V122", "V082"],
                "text" : "Hoeveel bedpartners heeft men gehad in %s?"
            },
            */
            {
                "type": "bar",
                "questions": ["V025_4", "V052_4"],
                "category" : "Zijn liefde en seks hetzelfde?",
                "text" : "Ziet men liefde en seks als hetzelfde in %s?"
            },
            {
                "type": "bar",
                "questions": ["V025_1", "V052_1"],
                "category" : "Liever seks dan relatie",
                "text" : "Heeft men liever seks dan een relatie in %s?"
            },
            {
                "type": "pie",
                "questions": ["V024_1", "V051_1"],
                "category" : "Vreemdgaan",
                "text" : "Is men wel eens vreemdgegeaan in %s?"
            },
            {
                "type": "pie",
                "questions": ["V024_2", "V051_2"],
                "category" : "Vreemdgaan met toestemming",
                "text" : "Hoe vaak gaat men vreemd met toestemming in %s?"
            }
        ]
    },
    "angst": {
        "color": "#19C0D1",
        "charts": [
            {
                "type": "bar",
                "questions": ["V053_3"],
                "category" : "Bindingsangst",
                "text" : "Heeft men last van bindingsangst in %s?"
            },
            {
                "type": "pie",
                "questions": ["V053_1"],
                "category" : "Angst om alleen te blijven",
                "text" : "Is men bang om alleen te blijven in %s?"
            },
            {
                "type": "bar",
                "questions": ["V053_2"],
                "category" : "Ontevreden of alleen?",
                "text" : "Is men in %s liever ontevreden in een relatie dan vrijgezel?"
            },
            {
                "type": "bar",
                "questions": ["V013_1", "V048_1"],
                "category" : "Date vinden makkelijk",
                "text" : "Hoe makkelijk is het in %s om een date te krijgen?"
            },
            {
                "type": "bar",
                "questions": ["V013_2", "V048_2"],
                "category" : "Serieuze relatie vinden makkelijk",
                "text" : "Hoe gemakkelijk is het in %s om een serieuze relatie te krijgen?"
            },
            {
                "type": "bar",
                "questions": ["V027_5"],
                "category" : "Angst voor andere liefde partner",
                "text" : "Hoe bang is men in %s dat hun partner verliefd wordt op een ander?"
            },
            {
                "type": "bar",
                "questions": ["V027_4"],
                "category" : "Wanhopig bij verlaten partner",
                "text" : "Hoe wanhopig is men in %s als hun partner hen verlaat?"
            },
            {
                "type": "bar",
                "questions": ["V027_1"],
                "category" : "Angst om alleen achter te blijven",
                "text" : "Hoe bang is men in %s dat ze allen achterblijven na een relatie?"
            },
            {
                "type": "bar",
                "questions": ["V027_2"],
                "category" : "Relatie alleen tegen eenzaamheid",
                "text" : "Houdt men in %s alleen maar de relatie in stand om niet alleen te zijn?"
            }
        ]
    }
};