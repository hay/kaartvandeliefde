<?php
    require 'inc/data.php';
?>
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Kaart van de Liefde</title>
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="lib/leaflet/dist/leaflet.css">
    </head>
    <body>
        <?php require 'templates/top.php'; ?>
        <?php require 'templates/legend.php'; ?>
        <?php require 'templates/gemeenteselect.php'; ?>

        <div class="container_dropdown"></div>

        <?php require 'templates/filters.php'; ?>

        <div id="mask_header" class="mask_header">
            <div class="container_header">
                <?php require 'templates/splash.php'; ?>
                <?php require 'templates/themes.php'; ?>
            </div>
        </div>

        <?php /* FIXME: where is this found? */ ?>
        <a class="open_about" href="#">About</a>

        <?php require 'templates/about.php'; ?>

        <!-- Libraries -->
        <script src="lib/leaflet/dist/leaflet.js"></script>
        <script src="lib/jquery/dist/jquery.min.js"></script>
        <script src="lib/jquery-easing/jquery.easing.min.js"></script>
        <script src="lib/stapes/stapes.js"></script>
        <script src="lib/underscore/underscore-min.js"></script>
        <script src="lib/d3/d3.min.js"></script>

        <!-- App code -->
        <script src="js/datastore.js"></script>
        <script src="js/themes.js"></script>
        <script src="js/geomap.js"></script>
        <script src="js/chartapi.js"></script>
        <script src="js/dataapi.js"></script>
        <script src="js/charts.js"></script>
        <script src="js/app.js"></script>

        <script>
            $(document).ready(function() {
                window.datastore = new DataStore('data/data.json');
                window.datastore.load( initApp );
            });
        </script>
    </body>
</html>