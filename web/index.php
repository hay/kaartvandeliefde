<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Kaart van de Liefde</title>
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="stylesheet" href="lib/c3/c3.css">
        <link rel="stylesheet" href="lib/leaflet/dist/leaflet.css">
        <link rel="stylesheet" href="css/style.css">
        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-59065746-1', 'auto');
          ga('send', 'pageview');
        </script>
    </head>
    <body>
        <div class="loading">
            <!-- Image below is just for making sure it's precached -->
            <img src="img/loader.gif" style="display:none;">
        </div>

        <?php require 'templates/top.php'; ?>
        <?php require 'templates/legend.php'; ?>
        <div class="container_filterGemeente"></div>

        <div class="container_dropdown"></div>
        <div id="filters" class="container_filters"></div>

        <div id="mask_header" class="mask_header">
            <div class="container_header">
                <?php require 'templates/splash.php'; ?>
            </div>
        </div>

        <?php require 'templates/about.php'; ?>

        <!-- Templates -->
        <?php foreach (["theme", "gemeentes", "filters"] as $tmpl) : ?>
        <script type="text/html" id="tmpl-<?= $tmpl; ?>">
            <?php require "templates/tmpl-$tmpl.php"; ?>
        </script>
        <?php endforeach; ?>

        <?php flush(); ?>

        <!-- build:js js/dist.js -->
        <!-- Libraries -->
        <script src="lib/leaflet/dist/leaflet.js"></script>
        <script src="lib/jquery/dist/jquery.js"></script>
        <script src="lib/jquery-easing/jquery.easing.js"></script>
        <script src="lib/stapes/stapes.js"></script>
        <script src="lib/underscore/underscore.js"></script>
        <script src="lib/d3/d3.js"></script>
        <script src="lib/c3/c3.js"></script>
        <script src="lib/handlebars/handlebars.js"></script>
        <script src="lib/fastclick/lib/fastclick.js"></script>

        <!-- App code -->
        <script src="js/datastore.js"></script>
        <script src="js/chart.js"></script>
        <script src="js/data.js"></script>
        <script src="js/geomap.js"></script>
        <script src="js/gemeentes.js"></script>
        <script src="js/filters.js"></script>
        <script src="js/barchart.js"></script>
        <script src="js/piechart.js"></script>
        <script src="js/charts.js"></script>
        <script src="js/app.js"></script>
        <!-- endbuild -->

        <script>
            $(document).ready(function() {
                window.datastore = new DataStore('data/data.json');
                window.datastore.load( initApp );
            });
        </script>
    </body>
</html>