<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Kaart van de Liefde</title>
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="lib/leaflet/dist/leaflet.css">

        <!-- Libraries -->
        <script src="lib/leaflet/dist/leaflet.js"></script>
        <script src="lib/jquery/dist/jquery.min.js"></script>
        <script src="lib/jquery-easing/jquery.easing.min.js"></script>
        <script src="lib/d3/d3.min.js"></script>

        <!-- App code -->
        <script src="js/chartapi.js"></script>
        <script src="js/dataapi.js"></script>
        <script src="js/charts.js"></script>
        <script src="js/app.js"></script>
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
                <?php require 'templates/theme_liefde.php'; ?>
                <?php require 'templates/theme_lust.php'; ?>
                <?php require 'templates/theme_angst.php'; ?>
            </div>
        </div>

        <?php /* FIXME: where is this found? */ ?>
        <a class="open_about" href="#">About</a>

        <?php require 'templates/about.php'; ?>

        <?php /* FIXME: what is this? */ ?>
        <script>
            var p = <?php $p = 0; if(isset($_GET['p'])){$p = $_GET['p'];} echo $p; ?>;
            var b = <?php $b = 0; if(isset($_GET['b'])){$b = $_GET['b'];} echo $b; ?>;

            p = (typeof p == 'number')? p : 0;
            b = (typeof b == 'number')? b : 0;
        </script>
    </body>
</html>