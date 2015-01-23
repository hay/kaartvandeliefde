var height;
var width;

var scrollTimerPage;
var scrollTimerHeader;

var currPage = 0;
var currBlock = 0;

var maxPages = 0;

var lastScroll = 0;
var scrollingHor = false;
var scrollingVer = false;

var lastTouchY = 0;

var filters = {geslacht: [0, 1], leeftijd: [0, 1, 2, 3, 4], status: [0, 1], geaardheid: [0, 1, 2], geloof: [0, 1, 2, 3, 4, 5], inkomen: [0, 1, 2]};
var filter_gem1 = -1;
var filters_gemeente = {left: -1, leftName: "Nederland", right: -1, rightName: "Nederland"};

// TODO: this stuff should obviously be refactored
function initApp() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    maxPages = $(".container_page").length;

    changeSize()

    $(".container_page").each(function(e, i){
        if (i != p){
            $(this).scrollTop(0);
        }
        $(this).on("mousewheel DOMMouseScroll", function(e){
            e.preventDefault();
            
            var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
            
            if (delta > 0){
                changeBlock(currBlock-1);
            } else {
                changeBlock(currBlock+1);
            }
        }).on("touchstart", function(e){
            lastTouchY = e.originalEvent.touches[0].clientY;
        }).on("touchmove", function(e){
            e.preventDefault();
            var currTouchY = e.originalEvent.touches[0].clientY;
            if (currTouchY > lastTouchY){
                changeBlock(currBlock-1);
            } else {
                changeBlock(currBlock+1);
            }
        });
    });

    $(".btn_nav").each(function(){
        $(this).on('click', function(){
            changePage(parseInt($(this).attr("data-toPage")));
        });
    });

    $(".home-link").each(function(){
        $(this).on('click', function(e){
            e.preventDefault();
            changePage(parseInt($(this).attr("data-toPage")));
        });
    });

    $('.scroll_top').click(function(){
        changeBlock(0);
        return false;
    });

    $(window).resize(function(){
        changeSize();
        resize();
    });

    $(window).on("keydown", function(e){
        var key = e.keyCode;

        if (key >= 37 && key <= 41){
            e.preventDefault();

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

    $(".legend_open").on("click", function(){
        $(".container_left").addClass("open");
        document.activeElement.blur()
    });

    $(".legend_close").on("click", function(){
        $(".container_left").removeClass("open");
        document.activeElement.blur()
    });

    $(".container_left").on('mouseenter', function(){
        $(".container_left").addClass("open");
        document.activeElement.blur();
    });

    $(".container_left").on('mouseleave', function(){
        $(".container_left").removeClass("open");
        document.activeElement.blur();
    });

    $("#gemeente_left").children(".gemeente_del").on("click", function(e){
        e.preventDefault();
        filterGemeente(-1, "left");
    });
    $("#gemeente_right").children(".gemeente_del").on("click", function(e){
        e.preventDefault();
        filterGemeente(-1, "right");
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

    var timer = setInterval(function(){
        next = Math.round(Math.random() * (allQuotes.length-1));

        while (next == previous) {
            next = Math.round(Math.random(0, allQuotes.lenght));
        }

        // zorg ervoor dat de oude quote verdwijnt
        $(allQuotes[previous]).css({'display': 'none', 'opacity' : '0'});
        $(allQuotes[next]).css('display', 'block');
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

    loadData();

    setCheckmarks();

    updateGemeenteBars();

    skipTo(p, b);

    bindEventHandlers();
};

function showPosition(position) {
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=false', function( result ) {
        if(result.status == 'OK'){
            postalcode = result.results[0].address_components[6].short_name
            postalcode = parseInt(postalcode.substring(0, 4));
            if(postalcode){
                /**

                POSTCODE WORDT GEEN GEMEENTE ID, KRIJG -1 TERUG..

                **/

                gem_id = PostalCodeToGemeenteID(postalcode);
                console.log(postalcode);
                console.log(gem_id);
                if(gem_id != -1){
                    filterGemeente(gem_id);
                }
            }
        }
    });
}

function changePage(page, fn, bl){
    if (!scrollingHor){
        $(".container_left").addClass("contracted");
        $(".container_filters").addClass("contracted");
        $(".container_filterGemeente").addClass("contracted");

        scrollingHor = true;
        scrollingVer = true;
        if (page < 0){
            page = 0;
        } else if (page > maxPages-1){
            page = maxPages-1;
        }
        currPage = page;

        if (page != 0){
            $($(".btn_nav").get(page-1)).addClass('btn_nav_active');
        }
        for (var i=0; i<$(".btn_nav").length; i++){
            if (i!=page-1){
                $($(".btn_nav").get(i)).removeClass("btn_nav_active");
            }
        }

        $("#mask_header").animate(
            {scrollLeft : width*(page)},
            {duration: 600,
             easing: 'easeInOutQuart',
             complete: function(){
                for (var i=0; i<maxPages; i++){
                    if (i != currPage){
                        $($(".container_page").get(i)).scrollTop(0);
                    }
                }

                drawBlockLegend();
                setClasses();

                if (currPage != 0 && page < 4){
                    $(".container_left").removeClass("contracted");
                    $(".container_filters").removeClass("contracted");
                    $(".container_filterGemeente").removeClass("contracted");
                    $(".container_top").show();
                } else {
                    $(".container_top").hide();
                }

                setTimeout(function(){
                    scrollingHor = false;
                    scrollingVer = false;
                    changeBlock(0);
                    lastScroll = 0;

                }, 100);
            }
        });
    }
}

function changeBlock(block){
    if (!scrollingVer){
        scrollingVer = true;
        var maxBlocks = $(".container_page").get(currPage).children.length;
        if (block > maxBlocks-1) {
            block = maxBlocks-1;
        } else if (block < 0){
            block = 0;
        }

        var diff = Math.abs(currBlock-block);

        currBlock = block;

        $($(".legendItem").get(block)).addClass('legendItem_active');
        for (var i=0; i<$(".legendItem").length; i++){
            if (i!=block){
                $($(".legendItem").get(i)).removeClass("legendItem_active");
            }
        }

        $el = $($(".container_page").get(currPage));
        $el.stop().animate(
            {scrollTop : height*(block)},
            {duration: 400+(diff*100),
             easing: 'easeInOutQuart',
             complete: function(){
                lastScroll = height*(block);

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

    $(".mask_header").css('width', width);
    $(".mask_header").css('height', height);

    $(".container_page").each(function(){
        $(this).css('width', width);
        $(this).css('height', height);
    });

    skipTo(currPage, currBlock);
}

function drawBlockLegend(){
    $("#legend").html("");
    for (var i=0; i<$(".container_page").get(currPage).children.length; i++){
        var name = $($(".container_page").get(currPage).children[i]).attr("data-category");
        name = (name == undefined)? "fout: geen naam":name;
        var item = $("<li class='legendItem' data-toBlock="+i+"></li>");
        $("#legend").append(item);
        item.text(name);

        item.on("click", function(){
            changeBlock(parseInt($(this).attr('data-toBlock')));
        });
    }
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

    currBlock = block;
    currPage = page;

    if (page == 0 || page > 3){
        $(".container_left").addClass("contracted");
        $(".container_filters").addClass("contracted");
        $(".container_filterGemeente").addClass("contracted");
        $(".container_top").hide();
    } else {
        $(".container_top").show();
    }

    $("#mask_header").scrollLeft(width*(page));
    $($(".container_page").get(currPage)).scrollTop(height*(block));

    if (page != 0){
        $($(".btn_nav").get(page-1)).addClass('btn_nav_active');
    }
    for (var i=0; i<$(".btn_nav").length; i++){
        if (i!=page-1){
            $($(".btn_nav").get(i)).removeClass("btn_nav_active");
        }
    }

    drawBlockLegend();

    setClasses();

    $($(".legendItem").get(block)).addClass('legendItem_active');
    for (var i=0; i<$(".legendItem").length; i++){
        if (i!=block){
            $($(".legendItem").get(i)).removeClass("legendItem_active");
        }
    }

    if (currPage != 0 && page < 4){
        $(".container_left").removeClass("contracted");
        $(".container_filters").removeClass("contracted");
        $(".container_filterGemeente").removeClass("contracted");
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
        if (i+1 == currPage){
            $all.addClass(classes[i]);
        } else {
            $all.removeClass(classes[i]);
        }
    }
}

function setCheckmarks(){
    $(".dropdown_menuButton").each(function(){
        var $e = $(this);
        var filter = $e.attr("data-name");
        var value = parseInt($e.attr("data-value"));

        if (filters[filter].indexOf(value) != -1){
            $e.addClass("active");
        }
    })
}

function bindEventHandlers() {
    $("#filters").on('click', ".dropdown_menuButton", function(e) {
        changeFilter(e.target);
    });
}

function changeFilter(btn){
    var $btn = $(btn);

    if ($btn.hasClass('disabled')) return;

    var filter = $btn.attr("data-name");
    var value = parseInt($btn.attr("data-value"));

    if ($btn.hasClass("active")){
        $btn.removeClass("active");
        var filterArray = filters[filter];
        if (filterArray && filterArray.indexOf(value) != -1){
            filterArray.splice(filterArray.indexOf(value), 1);
        }
    } else {
        $btn.addClass("active");
        var filterArray = filters[filter];
        if (filterArray && filterArray.indexOf(value) == -1){
            filterArray.push(value);
        }
    }

    var _active =  $('*[data-name="' + filter + '"].active')
    var count = _active.length;

    if (count < 2) {
        _active.addClass('disabled');
    } else {
        _active.each(function(){
            $(this).removeClass('disabled');
        });
    }

    update();
}

function filterGemeente(id, side){ // side is optional, only for deleting the filter
    var f = filters_gemeente;
    if (id == -1 || (id != f.left && id != f.right)){
        if (f.left == -1 || f.right == -1 || id == -1){
            if (id == -1){
                if (side == "left"){
                    f.left = -1;
                } else {
                    f.right = f.left;
                    f.left = -1;
                }
            } else {
                if (f.right == -1){
                    f.right = id;
                } else {
                    f.left = id;
                }
            }

            updateGemeenteBars();
        } else {
            bounceGemeenteBars();
        }

        console.log(filters_gemeente);
    }
}

function updateGemeenteBars(){
    filters_gemeente.leftName = (filters_gemeente.left == -1)? "Nederland" : API.getGemeenteFromID(filters_gemeente.left);
    filters_gemeente.rightName = (filters_gemeente.right == -1)? "Gemeente" : API.getGemeenteFromID(filters_gemeente.right);


    if (filters_gemeente.leftName == "Nederland") {
        $('#gemeente_left .gemeente_del').hide();
    } else {
        $('#gemeente_left .gemeente_del').show();
    }
    // if (filters_gemeente.leftName == "Nederland") {
    //     $("#gemeente_left").addClass("inactive");
    // } else {
    //      $("#gemeente_left").removeClass("inactive");
    // }

    if (filters_gemeente.rightName == "Gemeente") {
        $("#gemeente_right").addClass("inactive");
    } else {
         $("#gemeente_right").removeClass("inactive");
    }

    $("#gemeente_left").children(".gemeente_name").text(filters_gemeente.leftName);
    $("#gemeente_right").children(".gemeente_name").text(filters_gemeente.rightName);

    updateCharts();
}

function bounceGemeenteBars(){
    $(".container_filterGemeente").addClass("bounce");

    setTimeout(function(){
        $(".container_filterGemeente").removeClass("bounce");
    }, 100);
}

function updateCharts(){
    if (filters_gemeente.left == -1 && filters_gemeente.right == -1){
        $(".doubleQuote").hide();
        $(".singleQuote").show();

        $(".gemeente_name1").text(filters_gemeente.leftName);

        $(".chart_right").each(function(){
            $(this).hide();
        });
        $(".chart_left").each(function(){
            $(this).css("width", "100%");
        });
    } else {
        $(".singleQuote").hide();
        $(".doubleQuote").show();

        $(".gemeente_name1").text(filters_gemeente.leftName);
        $(".gemeente_name2").text(filters_gemeente.rightName);

        $(".chart_right").each(function(){
            $(this).show();
            $(this).css("width", "50%");
        });
        $(".chart_left").each(function(){
            $(this).css("width", "50%");
        });
    }

    $(".chart_left").find(".chart_gemeenteName").text(filters_gemeente.leftName);
    $(".chart_right").find(".chart_gemeenteName").text(filters_gemeente.rightName);

    update();
}
