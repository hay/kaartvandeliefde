'use strict';
(function() {
var height;
var width;

// Might change this to something fancier later on
var App = Stapes.subclass({
    constructor : function() {
        this.set('currPage', 0);
        this.set('currBlock', 0);
        this.pages = ['home', 'liefde', 'lust', 'angst'];
        this.first = true;
    },

    getCurrPageName : function() {
        return this.pages[this.get('currPage')];
    }
});

window.app = new App();

app.on({
    'change:currBlock' : function(block) {
        if (block === 0) {
            $(".container_left").addClass("open");
        } else {
            $(".container_left").removeClass("open");
        }
    },

    'change:currPage' : function() {
        var name = app.getCurrPageName();

        if (name === 'home') return;

        if (this.first) {
            this.first = false;
            $("#filters").addClass('filters-useme');
            setTimeout(function() {
                $("#filters").removeClass('filters-useme');
            }, 3000);
        }

        $(".container_left").addClass("open");

        $("body").attr('data-theme', name);

        drawBlockLegend();
        charts.renderMap('.themepage .contentHeader.' + name);
    }
});

var maxPages = 0;

var lastScroll = 0;
var scrollingHor = false;
var scrollingVer = false;

var lastTouchY = 0;

var charts, places, filters, placeSelector;

// TODO: this stuff should obviously be refactored
function initApp() {
    FastClick.attach(document.body);

    charts = new Charts(".container_header", datastore, window.THEMES);
    places = new Places();
    filters = new Filters("#filters", window.FILTERS);
    placeSelector = new PlaceSelector(
        "#placeselector",
        {
            gemeentes : BLESSED_GEMEENTES,
            provinces : PROVINCES
        }
    );

    charts.setFilters( filters.getFilters() );

    places.on({
        'change' : function() {
            filters.setFilters(
                filters.getFilters().map(function(f) {
                    if (f.key === 'place') {
                        f.values = places.getPlaces();
                    }

                    return f;
                })
            );

            charts.setPlaces( places.getPlaces() );
            filters.render();
            charts.renderChart( charts.getCurrentChart() );
            placeSelector.hide();
        },

        'adderror' : function() {
            filters.shakeIt();
        }
    });

    placeSelector.on('select', function(place) {
        places.addPlace(place);
    });

    charts.on('gemeenteselect', function(gemeente) {
        var place = {
            label : gemeente,
            type : 'gemeente'
        };

        if (BLESSED_GEMEENTES.indexOf(gemeente) === -1) {
            place.label = window.datastore.getProvinceByGemeente(place.label);
            place.type = 'province';
        }

        places.addPlace(place);
    });

    filters.on({
        'change' : function() {
            charts.setFilters( filters.getFilters() );
            charts.setPlaces( places.getPlaces() );
            charts.setAnswers();

            try {
                charts.renderChart( charts.getCurrentChart() );
            } catch (e) {
                charts.showError( charts.getCurrentChart() );
            }
        },

        'click' : function(d) {
            if (d.filter === 'place') {
                if (['province', 'gemeente'].indexOf(d.type) !== -1) {
                    places.remove(d);
                }

                if (d.type === 'addplace') {
                    // Check if we don't have too many places
                    if (places.isFull()) {
                        filters.shakeIt();
                    } else {
                        $(".container_left").removeClass('open');
                        placeSelector.show();
                    }
                }
            } else {
                filters.toggle(d.filter, d.label);
            }
        }
    });

    charts.setup();
    filters.render();
    placeSelector.render();

    maxPages = $(".container_page").length;
    changeSize();

    $(".container_page").each(function(e, i) {
        var $el = $(this);

        // Debounce to make sure the chart doesn't render every 5ms
        $el.on("mousewheel DOMMouseScroll", _.debounce(function(e){
            e.preventDefault();

            var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

            if (delta > 0){
                changeBlock(app.get('currBlock') - 1);
            } else {
                changeBlock(app.get('currBlock') + 1);
            }
        }, 50, true));
    });

    // Probably should have a single element instead of three
    $(".themepage").each(function() {
        var touchEvents = new Hammer.Manager(
            this,
            {
                recognizers : [
                    [Hammer.Swipe, { direction : Hammer.DIRECTION_VERTICAL }]
                ]
            }
        );

        touchEvents.on('swipe', function(opts) {
            var currBlock = app.get('currBlock');

            if (opts.direction === Hammer.DIRECTION_UP) {
                changeBlock(currBlock + 1);
            } else {
                changeBlock(currBlock - 1);
            }
        });
    });

    $("[data-toPage]").on('click', function(e) {
        e.preventDefault();
        var page = parseInt( $(this).attr('data-toPage') );
        changePage(page);
    });

    $(window).resize(function(){
        changeSize();
    });

    $(window).on("keydown", function(e){
        var key = e.keyCode;

        if (key >= 37 && key <= 41){
            e.preventDefault();

            var currPage = app.get('currPage');
            var currBlock = app.get('currBlock');

            switch(key){
                case 37:
                    if (currPage > 1){
                        changePage(currPage-1);
                    }
                    break;
                case 38:
                    changeBlock(currBlock-1);
                    break;
                case 39:
                    changePage(currPage+1);
                    break;
                case 40:
                    changeBlock(currBlock+1);
                    break;
                default:
                    break;

            }
        }
    });

    $(".container_scrollDown").each(function(e){
        var self = $(this);
        setInterval(function(){
            var $arrow = $("<div class='arrow_down'></div>");
            $arrow.appendTo(self);
            $arrow.animate({opacity: 1, top: "40px"}, {duration: 600, easing: 'easeOutQuart', complete: function(){
                               setTimeout(function(){
                                   $arrow.animate({opacity: 0, top: "90px"}, {duration: 600, easing: 'easeInQuart', complete: function(){
                                        $arrow.remove();
                                    }})
                               }, 1200);
            }});
        }, 2100);
    });

    $(".legend_open").on("click", function(){
        $(".container_left").addClass("open");
        document.activeElement.blur()
    });

    $(".legend_close").on("click", function(){
        $(".container_left").removeClass("open");
        document.activeElement.blur()
    });

    $(".container_left").on('mouseenter', function() {
        $(".container_left").addClass("open");
        document.activeElement.blur();
    });

    $(".container_left").on('mouseleave', function() {
        if (app.get('currBlock') !== 0) {
            $(".container_left").removeClass("open");
        }

        document.activeElement.blur();
    });

    $(".container_frontpageIcon").each(function(){
        $(this).on("mouseover", function(){
            var $icon = $(this).children(".frontpageIcon_icon");

            $icon.animate({top: "-10px"},
                          {duration: 200, easing: 'easeInOutQuart', complete: function(){
                                $icon.animate({top: "0px"}, {duration: 200, easing: 'easeInOutQuart'});
                            }
                          });

            $icon.data("timer", setInterval(function(){
            $icon.animate({top: "-10px"},
                          {duration: 200, easing: 'easeInOutQuart', complete: function(){
                                $icon.animate({top: "0px"}, {duration: 200, easing: 'easeInOutQuart'});
                                }
                          });
            }, 420));
        }).on("mouseout", function(){
            var $icon = $(this).children(".frontpageIcon_icon");

            clearInterval($icon.data("timer"));
        });
    });

    var allQuotes = $('#quotes').children();
    var next = 0;
    var previous = 0;

    next = Math.round(Math.random() * (allQuotes.length-1));

    while (next == previous) {
        next = Math.round(Math.random(0, allQuotes.lenght));
    }

    // zorg ervoor dat de oude quote verdwijnt
    $(allQuotes[previous]).css({'display': 'none', 'opacity' : '0'});
    $(allQuotes[next]).css('display', 'block');
    $(allQuotes[next]).css('marginTop', $(allQuotes[next]).parent().innerHeight()/2 - $(allQuotes[next]).outerHeight()/2);
    $(allQuotes[next]).animate({opacity : 1});
    previous = next;

    var timer = setInterval(function(){
        next = Math.round(Math.random() * (allQuotes.length-1));

        while (next == previous) {
            next = Math.round(Math.random(0, allQuotes.lenght));
        }

        // zorg ervoor dat de oude quote verdwijnt
        $(allQuotes[previous]).css({'display': 'none', 'opacity' : '0'});
        $(allQuotes[next]).css('display', 'block');
        $(allQuotes[next]).css('marginTop', $(allQuotes[next]).parent().innerHeight()/2 - $(allQuotes[next]).outerHeight()/2);
        $(allQuotes[next]).animate({opacity : 1});
        previous = next;
    }, 3500);

    $('.home-link').click(function(){
        clearInterval(timer);
    })

    $('.btn_about').on('click', function(e) {
        e.preventDefault();
        $('#about').addClass('open').fadeIn(200);
    });

    $('#about .close, #about_background').on('click', function() {
        $('#about').removeClass('open').fadeOut(200);
    });

    $('#about_container').on('click', function() {
        return false;
        e.preventDefault();
    });

    $(document).keyup(function(e) {
	  if (e.keyCode == 27) { $('#about.open').fadeOut(200); }   // esc
	});

    // If we have a hash, get page and block, and go there
    if (!!window.location.hash) {
        parseHash();
    }

    // Also set up an event handler for hashchange
    $(window).on('hashchange', parseHash);

    // Remove the loading screen
    setTimeout(function() {
        $(".loading").addClass('hidden');
        setTimeout(function() {
            $(".loading").remove();
        }, 1000);
    }, 0);

    $(".youtube-player-container").on('click', function() {
        $(this).addClass('youtube-player-bigger');

        setTimeout(function() {
            $(".youtube-player").html(
                '<iframe width="100%" height="450" src="https://www.youtube.com/embed/0KqO1lJgOZE?rel=0&controls=2&autoplay=1" frameborder="0" allowfullscreen></iframe>'
            );
        }, 1000);
    });
};


function parseHash() {
    var parts = window.location.hash.replace('#', '').split('-');
    skipTo(parts[0], parts[1]);
}

function changePage(page, fn, bl) {
    if (!scrollingHor){
        $("body").addClass('contracted');

        scrollingHor = true;
        scrollingVer = true;
        if (page < 0){
            page = 0;
        } else if (page > maxPages-1){
            page = maxPages-1;
        }

        app.set('currPage', page);

        if (page != 0){
            $($(".btn_nav").get(page-1)).addClass('btn_nav_active');
        }

        for (var i=0; i<$(".btn_nav").length; i++){
            if (i!=page-1){
                $($(".btn_nav").get(i)).removeClass("btn_nav_active");
            }
        }

        $("#mask_header").animate(
            {scrollLeft : width * page},
            {duration: 600,
             easing: 'easeInOutQuart',
             complete: function(){
                for (var i=0; i<maxPages; i++){
                    if (i != app.get('currPage')) {
                        $($(".container_page").get(i)).scrollTop(0);
                    }
                }

                setClasses();

                if (app.get('currPage') != 0 && page < 4) {
                    $("body").removeClass('contracted');
                    $(".container_top").show();
                } else {
                    $(".container_top").hide();
                }

                setTimeout(function(){
                    scrollingHor = false;
                    scrollingVer = false;

                    if (page > 0) {
                        changeBlock(0);
                    }

                    lastScroll = 0;
                }, 100);
            }
        });
    }
}

function changeBlock(block){
    if (!scrollingVer){
        scrollingVer = true;
        var maxBlocks = $(".container_page").get(app.get('currPage')).children.length;

        if (block > maxBlocks - 1) {
            block = maxBlocks - 1;
        } else if (block < 0){
            block = 0;
        }

        var diff = Math.abs(app.get('currBlock') - block);

        app.set('currBlock', block);

        $($(".legendItem").get(block)).addClass('legendItem_active');

        for (var i=0; i<$(".legendItem").length; i++){
            if (i!=block){
                $($(".legendItem").get(i)).removeClass("legendItem_active");
            }
        }

        var $el = $($(".container_page").get(app.get('currPage')));

        // First get the chart that needs to be drawn, blank out first
        if (block > 0) {
            var pageName = app.getCurrPageName();
            var chartEl = $('.chartcontainer[data-theme="' + pageName + '"][data-index="' + (block - 1) + '"]').get(0);
            charts.destroyChart(chartEl);
        } else {
            var chartEl = false;
        }

        $el.stop().animate(
            {scrollTop : height*(block)},
            {duration: 400+(diff*100),
             easing: 'easeInOutQuart',
             complete: function(){
                lastScroll = height*(block);

                // Then draw
                if (chartEl) {
                    charts.renderChart(chartEl);
                }

                setTimeout(function(){
                    scrollingVer = false;
                }, 100);
             }
        });
    }
}

function changeSize(){
    height = $(window).height();
    width = $(window).width();

    if (width < 1100){
        $(".btn_about .nav_name, .btn_share .nav_name").hide();
    } else {
        $(".btn_about .nav_name, .btn_share .nav_name").show();
    }

    if (width < 1000){
        $(".btn_nav .nav_name").hide();
    } else {
        $(".btn_nav .nav_name").show();
    }

    $(".mask_header").css('width', width);
    $(".mask_header").css('height', height);

    $(".container_page").each(function(){
        $(this).css('width', width);
        $(this).css('height', height);
    });

    skipTo(app.get('currPage'), app.get('currBlock'));
}

function drawBlockLegend() {
    var pageName = app.getCurrPageName();

    if (!pageName || pageName === 'home') return;

    var charts = _.clone(window.THEMES[pageName].charts);
    var $legend = $("#legend");

    // Remove previous event handlers
    $legend.off();

    // Add the map as well
    charts.unshift({ category : 'Kaart'});

    var html = charts.map(function(chart, index) {
        return '<li class="legendItem" data-toblock="' + index + '">' + chart.category + '</li>';
    }).join('');

    $legend.html( html );

    $legend.on('click', '.legendItem', function() {
        var block = $(this).data('toblock');
        changeBlock(block);
    });
}

function skipTo(page, block){
    scrollingHor = true;
    scrollingVer = true;

    var maxBlocks = maxBlocks = $(".container_page").get(page).children.length;

    if (page < 0){
        page = 0;
    } else if (page > maxPages-1){
        page = maxPages-1;
    }

    if (block > maxBlocks-1) {
        block = maxBlocks-1;
    } else if (block < 0){
        block = 0;
    }

    app.set({
        currPage : page,
        currBlock : block
    });

    if (page == 0 || page > 3){
        $("body").addClass('contracted');
        $(".container_top").hide();
    } else {
        $(".container_top").show();
    }

    $("#mask_header").scrollLeft(width*(page));
    $($(".container_page").get(app.get('currPage'))).scrollTop(height*(block));

    if (page != 0){
        $($(".btn_nav").get(page-1)).addClass('btn_nav_active');
    }
    for (var i=0; i<$(".btn_nav").length; i++){
        if (i!=page-1){
            $($(".btn_nav").get(i)).removeClass("btn_nav_active");
        }
    }

    setClasses();

    $($(".legendItem").get(block)).addClass('legendItem_active');
    for (var i=0; i<$(".legendItem").length; i++){
        if (i!=block){
            $($(".legendItem").get(i)).removeClass("legendItem_active");
        }
    }

    if (app.get('currPage') != 0 && page < 4){
        $("body").removeClass('contracted');
    }

    setTimeout(function(){
        scrollingHor = false;
        scrollingVer = false;
    }, 100);
}

function setClasses(){
    var $all = $(".container_legendTitle, .legendItem, .container_filters, .filter_gemeente.left, .filter_gemeente.right");
    var classes = ["liefde", "lust", "angst"];

    for (var i=0; i<classes.length; i++){
        if (i+1 == app.get('currPage')){
            $all.addClass(classes[i]);
        } else {
            $all.removeClass(classes[i]);
        }
    }
}

window.initApp = initApp;
})();