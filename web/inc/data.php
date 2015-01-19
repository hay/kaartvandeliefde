<?php
class Data {
    public static $filters = [
        [
            "name" => "Geslacht",
            "id" => "geslacht",
            "values" => ["Man", "Vrouw"]
        ],
        [
            "name" => "Leeftijd",
            "id" => "leeftijd",
            "values" => ["&lt;20", "20-25", "25-30", "30-35", "35"]
        ],
        [
            "name" => "Status",
            "id" => "status",
            "values" => ["Vrijgezel", "In een relatie"]
        ],
        [
            "name" => "Geaardheid",
            "id" => "geaardheid",
            "values" => ["Hetero", "Homo / Lesbisch", "Biseksueel"]
        ],
        [
            "name" => "Inkomen",
            "id" => "geaardheid",
            "values" => ["Beneden modaal", "Modaal", "Boven modaal"]
        ],
        [
            "name" => "Geloof",
            "id" => "geloof",
            "values" => ["Katholiek", "Protestants", "Joods", "Islamitisch", "Overig", "Niet gelovig"]
        ]
    ];

    public static $themes = [
        "angst" => [
            "category" => "Angst in kaart",
            "title" => "Angst in Nederland",
            "charts" => [
                [
                    "category" => "Bindingsangst",
                    "single" => "Heeft %s last van bindingsangst?",
                    "double" => "Is bindingsangst in %s groter dan in %s?"
                ],
                [
                    "category" => "Angst om alleen te blijven",
                    "single" => "Vindt %s het erg om alleen te blijven?",
                    "double" => "Vindt %s het erger om alleen te blijven dan %s?"
                ],
                [
                    "category" => "Liever ontevreden dan alleen",
                    "single" => "Is %s liever ontevreden dan vrijgezel?",
                    "double" => "Is %s liever ontevreden dan vrijgezel, dan in %s?"
                ],
                [
                    "category" => "Date vinden is gemakkelijk",
                    "single" => "Vindt %s het makkelijk om een date te vinden?",
                    "double" => "Vindt men in %s het makkelijker om een date te vinden dan in %s?"
                ],
                [
                    "category" => "Relatie vinden is gemakkelijk",
                    "single" => "Vindt %s het makkelijk om een relatie te vinden?",
                    "double" => "Vindt men in %s het makkelijker om een date te vinden dan in %s?"
                ],
                [
                    "category" => "Partner wordt verliefd op ander",
                    "single" => "Is %s bang dat hun partner verliefd wordt op een ander?",
                    "double" => "Is men in %s banger dat hun partner verliefd wordt op een ander dan in %s?",
                ],
                [
                    "category" => "Verlatingsangst",
                    "single" => "Wordt %s wanhopig wanneer hun partner hen verlaat?",
                    "double" => "Wordt men wanhopiger in %s dan in %s wanneer hun partner hen verlaat?"
                ],
                [
                    "category" => "Verlatingsangst II",
                    "single" => "Is %s bang om na een relatie alleen te blijven?",
                    "double" => "Is %s banger om na een relatie alleen te blijven dan in %s?"
                ],
                [
                    "category" => "In relatie door angst alleen te zijn",
                    "single" => "Houden relaties in %s stand uit angst om alleen te zijn?",
                    "double" => "Houdt %s de relatie vaker in stand uit angst alleen te zijn dan in %s?"
                ]
            ]
        ]
    ];
}