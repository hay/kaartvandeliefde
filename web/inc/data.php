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
}