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
        "liefde" => [
            "category" => "Liefde in kaart",
            "title" => "Liefde in Nederland",
            "charts" => [
                [
                    "category" => "Geloof in ware liefde",
                    "single" => "Gelooft %s in één ware liefde?",
                    "double" => "Gelooft men in  %s meer in één ware liefde dan in %s?"
                ],
                [
                    "category" => "Carrière boven relatie",
                    "single" => "Plaatst %s een carrière boven een relatie?",
                    "double" => "Plaatst men in  %s vaker hun carrière boven een relatie dan in %s?"
                ],
                [
                    "category" => "Huidige partner is ideaal",
                    "single" => "Beschouwt %s hun huidige partner als ideaal?",
                    "double" => "Beschouwt men in %s hun partner vaker als ideaal dan in %s?"
                ],
                [
                    "category" => "Relatie gebaseerd op ware liefde",
                    "single" => "Zijn de relaties in %s gebaseerd op ware liefde?",
                    "double" => "Zijn relaties in %s vaker gebaseerd op ware liefde dan in %s?"
                ],
                [
                    "category" => "Partner staat op één",
                    "single" => "Zet %s hun partner op één?",
                    "double" => "Zet men in %s hun partner vaker op nummer één dan in %s?"
                ],
                [
                    "category" => "Relatie is voor het leven",
                    "single" => "Denkt %s dat hun huidige relatie voor het leven is?",
                    "double" => "Is men in %s meer zeker dat hun relatie voor het leven is dan in %s?"
                ],
                [
                    "category" => "Partner hoort bij toekomst",
                    "single" => "Durft %s hun partner te betrekken bij hun toekomstplannen?",
                    "double" => "Betrekt men in %s hun partner meer bij hun toekomst dan in %s?"
                ],
                [
                    "category" => "Geen kinderwens, geen relatie",
                    "single" => "Beëindigt %s de relatie als hun partner geen kinderwens heeft?",
                    "double" => "Beëindigt men in %s hun relatie zonder kindertoekomst sneller dan in %s?"
                ],
                [
                    "category" => "Seksueel op gemak",
                    "single" => "Is %s seksueel op gemak bij hun partner?",
                    "double" => "Is men in %s meer seksueel op gemak bij hun partner dan in %s?"
                ]
            ]
        ],
        "lust" => [
            "category" => "Lust in kaart",
            "title" => "Lust in Nederland",
            "charts" => [
                [
                    "category" => "Aantal bedpartners",
                    "single" => "Hoeveel bedpartners heeft %s?",
                    "double" => "Heeft men meer bedpartners in  %s dan in %s?"
                ],
                [
                    "category" => "Liefde en seks zijn niet hetzelfde",
                    "single" => "Ziet %s liefde en seks als één?",
                    "double" => "Ziet men in %s liefde en seks sneller als één dan in %s?"
                ],
                [
                    "category" => "Liever seks dan een relatie",
                    "single" => "Heeft %s liever seks dan een relatie?",
                    "double" => "Vindt men in %s seks belangrijker dan liefde, dan in %s?"
                ],
                [
                    "category" => "Seksueel overspel gepleegd",
                    "single" => "Heeft %s weleens seksueel overspel gepleegd?",
                    "double" => "Wordt er in %s meer seksueel overspel gepleegd dan in %s?"
                ],
                [
                    "category" => "Toestemming voor vreemdgaan",
                    "single" => "Is %s weleens vreemdgegaan met toestemming?",
                    "double" => "Is er in %s vaker vreemdgegaan met toestemming dan in %s?"
                ]
            ]
        ],
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