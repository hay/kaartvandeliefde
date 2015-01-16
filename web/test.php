
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
        <title>Kaart van de Liefde</title>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
        <link rel="shortcut icon" href="favicon.ico" />
        <link href="css/style.css" rel="stylesheet" type="text/css">
        <link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
        <script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
        <script type="text/javascript" src="js/jquery1.9.1.min.js"></script>
        <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
        <script type="text/javascript" src="js/d3.min.js"></script>
        <script type="text/javascript" src="js/chartAPI.js"></script>
        <script type="text/javascript" src="js/dataAPI.js"></script>
        <script type="text/javascript" src="testdata.js"></script>
        <script type="text/javascript" src="testcharts.js"></script>
        <script type="text/javascript" src="test.js"></script>
    </head>
    <body>
        <div class='container_top'>
            <div class="container_logo">
                <a href="#" class="scroll_top"><img class="logo" src="img/logo_beeld.png"/></a>
                <a class="icon-hzt" href="http://www.hzt.nl/" target="_blank" title="Naar de website van Het Zuidelijk Toneel"></a>
            </div>
            <ul class="container_themaButtons">
                <li class='btn_nav liefde' data-toPage='1'><span class="icon-heart"></span> Liefde</li>
                <li class='btn_nav lust' data-toPage='2'><span class="icon-condom"></span> Lust</li>
                <li class='btn_nav angst' data-toPage='3'><span class="icon-broken"></span> Angst</li>
            </ul>

            <ul class="container_otherButtons">
                <a href="https://www.facebook.com/hetzuidelijktoneel?fref=ts"><li class="btn_share "><span class="icon-share"></span> Delen</li></a>
                <li class="btn_about"><span class="icon-about"></span> Info</li>
            </ul>
        </div>
        
        <div class='container_left'>
            <div class="container_legendTitle">
                <span>OVERZICHT</span>
                <div class="legend_open"><span class="icon-circle-right"></span></div>
                <div class="legend_close"><span class="icon-circle-left"></span></div>
            </div>
            <ul class="legend" id='legend'>
            </ul>
        </div>
        
        <div class="container_filterGemeente">
            <div class="filter_gemeente right" id="gemeente_right">
                <a class="gemeente_del">X</a>
                <span class="gemeente_name"></span>
            </div>
            <div class="filter_gemeente left" id="gemeente_left">
                <a class="gemeente_del">X</a>
                <span class="gemeente_name"></span>
            </div>
        </div>
            
        <div class="container_dropdown">
        </div>
        
        <div class='container_filters'>
            <ul class="container_dropdowns">
                <li class="dropdown">
                    <a class="dropdown_button">Geslacht <span class="caret"></span></a>
                    <ul class="dropdown_menu">
                        <li>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geslacht" data-value="0">Man</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geslacht" data-value="1">Vrouw</a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown_button">Leeftijd <span class="caret"></span></a>
                    <ul class="dropdown_menu">
                        <li>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="leeftijd" data-value="0"><20</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="leeftijd" data-value="1">20-25</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="leeftijd" data-value="2">25-30</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="leeftijd" data-value="3">30-35</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="leeftijd" data-value="4">35></a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown_button">Status <span class="caret"></span></a>
                    <ul class="dropdown_menu">
                        <li>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="status" data-value="0">Vrijgezel</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="status" data-value="1">In relatie</a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown_button">Geaardheid <span class="caret"></span></a>
                    <ul class="dropdown_menu">
                        <li>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geaardheid" data-value="0">Hetero</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geaardheid" data-value="1">Homo/lesbisch</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geaardheid" data-value="2">Biseksueel</a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown_button">Inkomen <span class="caret"></span></a>
                    <ul class="dropdown_menu">
                        <li>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="inkomen" data-value="0">Beneden modaal</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="inkomen" data-value="1">Modaal</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="inkomen" data-value="2">Boven modaal</a>
                        </li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown_button">Geloof <span class="caret"></span></a>
                    <ul class="dropdown_menu right">
                        <li>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geloof" data-value="0">Katholiek</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geloof" data-value="1">Protestants</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geloof" data-value="2">Joods</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geloof" data-value="3">Islamitisch</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geloof" data-value="4">Overig</a>
                            <a class="dropdown_menuButton" onclick="changeFilter(this)" data-name="geloof" data-value="5">Niet gelovig</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        
        <div id="mask_header" class="mask_header">
            <div class='container_header'>
                <div class='container_page'>
                    <div class='contentHeader frontpage' data-category='Informatie'>
                       <div id='home-logo'>
                            <img src='img/logo.png' alt='Logo kaart van de liefde' />
                        </div>

                        <div id="quotes">
                            <p> "33% van de Nederlanders geloven in één ware liefde" </p>
                            <p> "De Nederlander heeft gemiddeld 9 bedpartners gehad" </p>
                            <p> "40% van de Nederlandse vrijgezellen zijn bang om alleen te blijven" </p>
                            <p> "84% van Nederland beleeft de beste seks met hun huidige partner" </p>
                            <p> "30% van de Nederlanders zien liefde en seks nog als één" </p>
                            <p> "45% van de Nederlanders denken dat het niet makkelijk is een (nieuwe) relatie te vinden" </p>
                            <p> "33% van de Nederlanders hebben wel eens online gedate" </p>
                            <p> "25% van de Nederlanders zijn ontevreden over hun seksleven" </p>
                            <p> "9% van de Nederlanders zouden het niet erg vinden om alleen te blijven" </p>
                            <p> "De Nederlander heeft gemiddeld 2 serieuze relaties gehad" </p>
                            <p> "2% van de Nederlanders voelen zich niet fysiek aangetrokken tot hun partner" </p>
                            <p> "29% van de Nederlanders beschouwen zichzelf als een catch" </p>
                            <p> "32% van de Nederlanders hebben gescheiden ouders" </p>
                            <p> "6% van de Nederlanders hebben liever seks dan een relatie" </p>
                            <p> "57% van de Nederlanders vinden het lastig om hun fouten en zwakte toe te geven" </p>
                        </div>

                        <h3>Seks, Liefde en angst.</h3>
                        <p>Drie onderwerpen die met elkaar in verband staan. Maar zo zien jongeren het al lang niet meer. 
                        Liefde nee, seks ja, Is een opvatting die je steeds vaker terugziet. 
                        In een grootschalig onderzoek, uitgezet door het zuidelijk toneel, 
                        zijn confronterende vragen gesteld over deze onderwerpen. 
                        Ongeveer 1200 Nederlandse jongeren hebben antwoord gegeven op vragen als;
                         ben je tevreden over je seksleven?, Geloof je in de ware liefde? 
                         En ben je als single bang om alleen te blijven?</p>

                        <p>Benieuwd geworden? Kies een van de onderstaande onderwerpen en begin een zoektocht naar de liefde in Nederland.</p>

                        <div id="themes">
                            <a href="#" class="home-link" data-toPage='1'>
                                <div class="container_frontpageIcon">
                                    <img class="frontpageIcon_shadow" src="img/icon_shadow.png"/>
                                    <img class="frontpageIcon_icon" src="img/icon_liefde.png"/>
                                    <h2>liefde</h2>
                                </div>
                            </a>
                            <a href="#" class="home-link" data-toPage='2'>
                                <div class="container_frontpageIcon">
                                    <img class="frontpageIcon_shadow" src="img/icon_shadow.png"/>
                                    <img class="frontpageIcon_icon" src="img/icon_lust.png"/>
                                    <h2>lust</h2>
                                </div>
                            </a>
                            <a href="#" class="home-link" data-toPage='3'>
                                <div class="container_frontpageIcon">
                                    <img class="frontpageIcon_shadow" src="img/icon_shadow.png"/>
                                    <img class="frontpageIcon_icon" src="img/icon_angst.png"/>
                                    <h2>angst</h2>
                                </div>
                            </a>		
                        </div>
                    </div>
                </div>
                <div class='theme_liefde container_page'>
                    <div class='contentHeader liefde' data-category='Liefde in kaart'>
                        <div class="container_content">
                            <h1>Liefde in Nederland</h1>
                        </div>
                    </div>
                    <div class='contentBlock' data-category='Geloof in ware liefde'>
                        <div class="container_content">
                            <span class="singleQuote">Gelooft <span class="gemeente_name1"></span> in één ware liefde?</span>
                            <span class="doubleQuote">Gelooft men in  <span class="gemeente_name1"></span> meer in één ware liefde dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock' data-category='Carrière boven relatie'>
                        <div class="container_content">
                            <span class="singleQuote">Plaatst <span class="gemeente_name1"></span> een carrière boven een relatie?</span>
                            <span class="doubleQuote">Plaatst men in  <span class="gemeente_name1"></span> vaker hun carrière boven een relatie dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock' data-category='Huidige partner is ideaal'>
                        <div class="container_content">
                            <span class="singleQuote">Beschouwt <span class="gemeente_name1"></span> hun huidige partner als ideaal?</span>
                            <span class="doubleQuote">Beschouwt men in <span class="gemeente_name1"></span> hun partner vaker als ideaal dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock' data-category='Relatie gebaseerd op ware liefde'>
                        <div class="container_content">
                            <span class="singleQuote">Zijn de relaties in <span class="gemeente_name1"></span> gebaseerd op ware liefde?</span>
                            <span class="doubleQuote">Zijn relaties in <span class="gemeente_name1"></span> vaker gebaseerd op ware liefde dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock' data-category='Partner staat op één'>
                        <div class="container_content">
                            <span class="singleQuote">Zet <span class="gemeente_name1"></span> hun partner op één?</span>
                            <span class="doubleQuote">Zet men in <span class="gemeente_name1"></span> hun partner vaker op nummer één dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock' data-category='Relatie is voor het leven'>
                        <div class="container_content">
                            <span class="singleQuote">Denkt <span class="gemeente_name1"></span> dat hun huidige relatie voor het leven is?</span>
                            <span class="doubleQuote">Is men in <span class="gemeente_name1"></span> meer zeker dat hun relatie voor het leven is dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock' data-category='Partner hoort bij toekomst'>
                        <div class="container_content">
                            <span class="singleQuote">Durft <span class="gemeente_name1"></span> hun partner te betrekken bij hun toekomstplannen?</span>
                            <span class="doubleQuote">Betrekt men in <span class="gemeente_name1"></span> hun partner meer bij hun toekomst dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock' data-category='Geen kinderwens, geen relatie'>
                        <div class="container_content">
                            <span class="singleQuote">Beëindigt <span class="gemeente_name1"></span> de relatie als hun partner geen kinderwens heeft?</span>
                            <span class="doubleQuote">Beëindigt men in <span class="gemeente_name1"></span> hun relatie zonder kindertoekomst sneller dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock' data-category='Seksueel op gemak'>
                        <div class="container_content">
                            <span class="singleQuote">Is <span class="gemeente_name1"></span> seksueel op gemak bij hun partner?</span>
                            <span class="doubleQuote">Is men in <span class="gemeente_name1"></span> meer seksueel op gemak bij hun partner dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='theme_lust container_page'>
                    <div class='contentHeader lust' data-category='Lust in kaart'>
                        <div class="container_content">
                            <h1>Lust in Nederland</h1>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Aantal bedpartners'>
                        <div class="container_content">
                            <span class="singleQuote">Hoeveel bedpartners heeft <span class="gemeente_name1"></span>?</span>
                            <span class="doubleQuote">Heeft men meer bedpartners in  <span class="gemeente_name1"></span> dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Liefde en seks zijn niet hetzelfde'>
                        <div class="container_content">
                            <span class="singleQuote">Ziet <span class="gemeente_name1"></span> liefde en seks als één?</span>
                            <span class="doubleQuote">Ziet men in <span class="gemeente_name1"></span> liefde en seks sneller als één dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Liever seks dan een relatie'>
                        <div class="container_content">
                            <span class="singleQuote">Heeft <span class="gemeente_name1"></span> liever seks dan een relatie?</span>
                            <span class="doubleQuote">Vindt men in <span class="gemeente_name1"></span> seks belangrijker dan liefde, dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Seksueel overspel gepleegd'>
                        <div class="container_content">
                            <span class="singleQuote">Heeft <span class="gemeente_name1"></span> weleens seksueel overspel gepleegd?</span>
                            <span class="doubleQuote">Wordt er in <span class="gemeente_name1"></span> meer seksueel overspel gepleegd dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Toestemming voor vreemdgaan'>
                        <div class="container_content">
                            <span class="singleQuote">Is <span class="gemeente_name1"></span> weleens vreemdgegaan met toestemming?</span>
                            <span class="doubleQuote">Is er in <span class="gemeente_name1"></span> vaker vreemdgegaan met toestemming dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='theme_angst container_page'>
                    <div class='contentHeader angst' data-category='Angst in kaart'>
                        <div class="container_content">
                            <h1>Angst in Nederland</h1>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Bindingsangst'>
                        <div class="container_content">
                            <span class="singleQuote">Heeft <span class="gemeente_name1"></span> last van bindingsangst?</span>
                            <span class="doubleQuote">Is bindingsangst in <span class="gemeente_name1"></span> groter dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Angst om alleen te blijven'>
                        <div class="container_content">
                            <span class="singleQuote">Vindt <span class="gemeente_name1"></span> het erg om alleen te blijven?</span>
                            <span class="doubleQuote">Vindt <span class="gemeente_name1"></span> het erger om alleen te blijven dan <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Liever ontevreden dan alleen'>
                        <div class="container_content">
                            <span class="singleQuote">Is <span class="gemeente_name1"></span> liever ontevreden dan vrijgezel?</span>
                            <span class="doubleQuote">Is <span class="gemeente_name1"></span> liever ontevreden dan vrijgezel, dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Date vinden is gemakkelijk'>
                        <div class="container_content">
                            <span class="singleQuote">Vindt <span class="gemeente_name1"></span> het makkelijk om een date te vinden?</span>
                            <span class="doubleQuote">Vindt men in <span class="gemeente_name1"></span> het makkelijker om een date te vinden dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Relatie vinden is gemakkelijk'>
                        <div class="container_content">
                            <span class="singleQuote">Vindt <span class="gemeente_name1"></span> het makkelijk om een relatie te vinden?</span>
                            <span class="doubleQuote">Vindt men in <span class="gemeente_name1"></span> het makkelijker om een date te vinden dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Partner wordt verliefd op ander'>
                        <div class="container_content">
                            <span class="singleQuote">Is <span class="gemeente_name1"></span> bang dat hun partner verliefd wordt op een ander?</span>
                            <span class="doubleQuote">Is men in <span class="gemeente_name1"></span> banger dat hun partner verliefd wordt op een ander dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Verlatingsangst'>
                        <div class="container_content">
                            <span class="singleQuote">Wordt <span class="gemeente_name1"></span> wanhopig wanneer hun partner hen verlaat?</span>
                            <span class="doubleQuote">Wordt men wanhopiger in <span class="gemeente_name1"></span> dan in <span class="gemeente_name2"></span> wanneer hun partner hen verlaat?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='Verlatingsangst II'>
                        <div class="container_content">
                            <span class="singleQuote">Is <span class="gemeente_name1"></span> bang om na een relatie alleen te blijven?</span>
                            <span class="doubleQuote">Is <span class="gemeente_name1"></span> banger om na een relatie alleen te blijven dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class='contentBlock'  data-category='In relatie door angst alleen te zijn'>
                        <div class="container_content">
                            <span class="singleQuote">Houden relaties in <span class="gemeente_name1"></span> stand uit angst om alleen te zijn?</span>
                            <span class="doubleQuote">Houdt <span class="gemeente_name1"></span> de relatie vaker in stand uit angst alleen te zijn dan in <span class="gemeente_name2"></span>?</span>
                            <div class="chartcontainer">
                                <table class="chart_table">
                                    <tr>
                                        <td class = "chart_left">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                        <td class = "chart_right">
                                            <div class="chart_gemeenteName"></div>
                                            <div class="chart_chart"></div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        <a class="open_about" href="#">About</a>
		
        <div id="about">
            <div id="about_background">
                <div id="about_container">
                    <a class="close">&times;</a>
                    <h1>Over</h1>
                    <p class="lead">Hebben we nog lief? Of trekt een beetje rondscharrelen ons meer aan? Kaart van de liefde laat de stand van zaken over de hedendaagse liefde, angsten en lusten in Nederland zien.</p>

                    <h5>Onderzoek</h5>
                    <p>Lucas de Man, de regisseur van het nieuwe Romeo en Julia, is in samenwerking met het Zuidelijk Toneel een wetenschappelijk onderzoek in de vorm van een online enqu&ecirc;te betreffende liefde en seks in Nederland. De Grote Liefde en Seks Vandaag De Dag-enqu&ecirc;te is uitgezet onder jongeren tussen de 18 en 35 jaar en geeft antwoord op de bovenstaande vragen en meer!</p>

                    <h5>Samenwerkingen</h5>
                    <p>Het onderzoek is in samenwerking met Dynamic Concepts opgezet. Om zoveel mogelijk resultaat te behalen, is bij het uitzetten van de enqu&ecirc;te hulp verkregen van BNN, Parship en Avans Hogeschool. De studenten van de minor Data Beleving aan Avans Hogeschool in 's-Hertogenbosch hebben tot slot de resultaten vormgegeven en Kaart van de liefde ontwikkeld. Er is een digitale landkaart over de liefde gebouwd. Deze zal worden gepresenteerd op 14 februari.</p>

                    <h5>Romeo en Julia</h5>
                    <p>Het stuk Romeo en Julia laat de worsteling zien van de jonge generatie, wat betreft verwachtingen en angsten op het gebied van liefde en identiteit.</p>

                    <p class="lead">"Het mooiste theater krijg je als je ontroering en humor, mooie taal en actie, bij elkaar in &eacute;&eacute;n voorstelling krijgt. Zowel verdieping als beleving." &mdash; Lucas de Man</p>

                    <p>Nieuwsgierig geworden? Romeo en Julia gaat op 12 maart in premi&egrave;re. Kijk voor kaarten en meer informatie op <a href="http://www.hzt.nl/RomeoEnJulia">Het Zuidelijk Toneel</a>.</p>

                    <p><strong>Experimenteer en ontdek!</strong></p>
                </div>
            </div>
        </div>	
        
        <script type="text/javascript">
            var p = <?php $p = 0; if(isset($_GET['p'])){$p = $_GET['p'];} echo $p; ?>;
            var b = <?php $b = 0; if(isset($_GET['b'])){$b = $_GET['b'];} echo $b; ?>;
            
            p = (typeof p == 'number')? p : 0;
            b = (typeof b == 'number')? b : 0;
        </script>
    </body>
</html>