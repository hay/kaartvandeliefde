var maxColorDif = 0.5;

function BarChart(sourceData, q, g, side, container, color){
    this.data = [];
    this.container = $(container);
    this.color = hexToRgb(color);
    this.q = q;
    this.g = g;
    this.side = side;
    this.sourceData = sourceData;
    this.svg;

    var _this = this;

    this.construct = function(){
        this.container.html("");
        if (this.data.length > 0){
            // nieuw svg element
            var nsvg = $("<svg class='chart'></svg>")[0];

            // grootte
            var margin = {top: 20, right: 30, bottom: 30, left: 40},
                width = this.container.innerWidth() - margin.left - margin.right,
                height = this.container.innerHeight() - margin.top - margin.bottom;

            // FIXME: we get negative width/heights at times
            // if (width < 0 || height < 0) {
            //     return;
            // }

            // range en assen bepalen
            var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
            var y = d3.scale.linear().range([height-margin.top, 0]);

            var chart = d3.select(nsvg)
                    .attr("width", width+(2*margin.left)+margin.right)
                    .attr("height", height+margin.top+margin.bottom);

            var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

            var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

            y.domain([0, d3.max(this.data, function(d){return d.value})]);
            x.domain(this.data.map(function(d){return d.name;}));

            var bar = chart.selectAll("g")
                    .data(this.data)
                    .enter()
                    .append("g")
                    .attr("transform", function(d, i){return "translate("+x(d.name)+", 0)";});

            bar.append("rect")
                    .attr("y", function(d){return y(d.value)+margin.top;})
                    .attr("x", function(d, i){return margin.left;})
                    .attr("height", function(d){return (height-margin.top)-y(d.value);})
                    .attr("width", x.rangeBand())
                    .style("fill", function(d, i){return getColor(_this.color, i, _this.data.length)});
                    //.style("fill", _this.color);

            bar.append("text")
                    .attr("x", (x.rangeBand()/2)+margin.left)
                    .attr("y", function(d){return y(d.value)-20+margin.top;})
                    .attr("dy", "0.75em")
                    .style("text-anchor", "middle")
                    .text(function(d){return d.value;})
                    .style("fill", function(d, i){return getColor(_this.color, i, _this.data.length)});
                    //.style("fill", _this.color);

            chart.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate("+margin.left+", "+height+")")
                    .call(xAxis);

            chart.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate("+margin.left+", 0)")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Aantal");

            // diagram toevoegen aan container
            $(nsvg).appendTo(this.container);
            this.svg = nsvg;
        } else {
            var nodatadiv = $("<div class='chart_nodata'></div>");
            nodatadiv.html("<p>Er is geen data beschikbaar voor de gekozen filters.</p> <img src='img/icon-404.png'/> ");
            nodatadiv.appendTo(this.container);
        }
    }

    this.update = function(newData){
        this.data = newData;
        // TODO: animeren?
        this.construct();
    }

    this.resize = function(){
        this.construct();
    }
}

function PieChart(sourceData, q, g, side, container, color){
    this.data = [];
    this.container = $(container);
    this.color = hexToRgb(color);
    this.q = q;
    this.g = g;
    this.side = side;
    this.sourceData = sourceData;
    this.svg;

    var _this = this;

    this.construct = function(){
        this.container.html("");

        if (this.data.length > 0){
            var max = d3.max(this.data, function(d){return d["value"]});
            //var max = 300
            var margin = 20,
                width = this.container.innerWidth() - margin*2,
                height = this.container.innerHeight() - margin*2;

            var outerRadius = Math.min(width, height)/2 - (margin*2);

            // FIXME: we get negative width/heights at times
            // if (width < 0 || height < 0) {
            //     return;
            // }

            // nieuw svg element
            var nsvg = $("<svg class='chart'></svg>")[0];

            var chart = d3.select(nsvg)
                    .data([_this.data])
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + (width)/2 + ", " + ((height/2)+margin) + ")");

            var arc = d3.svg.arc()
                    .outerRadius(outerRadius);

            var pie = d3.layout.pie()
                    .value(function(d) {return d.value;})
                    .sort(function(d) {return null;});

            var arcs = chart.selectAll("g.slice")
                    .data(pie)
                    .enter()
                    .append("g")
                    .attr("class", "slice");

            arcs.append("path")
                    .attr("fill", function(d, i){return getColor(_this.color, i, _this.data.length)})
                    .attr("d", arc);

            arcs.append("text")
                    .attr("transform", function(d){
                            d.outerRadius = outerRadius + 50;
                            d.innerRadius = outerRadius + 45;
                            return "translate("+arc.centroid(d)+")";
                        })
                    .attr("text-anchor", "middle")
                    .style("fill", function(d, i){return getColor(_this.color, i, _this.data.length)})
                    .text(function(d){return d.data.name});

            arcs.filter(function(d){return d.endAngle - d.startAngle > .1;}).append("text")
                    .attr("dy", ".35em")
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d){
                            d.outerRadius = outerRadius;
                            d.innerRadius = outerRadius/2;
                            return "translate("+arc.centroid(d)+")rotate("+angle(d)+")";
                        })
                    .style("fill", "white")
                    .text(function(d){return d.value});

            // diagram toevoegen aan container
            $(nsvg).appendTo(this.container);
            this.svg = nsvg;
        } else {
            var nodatadiv = $("<div class='chart_nodata'></div>");
            nodatadiv.html("<p>Er is geen data beschikbaar voor de gekozen filters.</p> <img src='img/icon-404.png'/> ");
            nodatadiv.appendTo(this.container);
        }
    }

    this.update = function(newData){
        this.data = newData;
        // TODO: animeren?
        this.construct();
    }

    this.resize = function(){
        this.construct();
    }

    function angle(d){
        var a = (d.startAngle + d.endAngle)*90/Math.PI-90;
        return (a>90)? a-180 : a;
    }
}

function hexToRgb(hex) {            // #rrggbb (no shorthand)
    var result = [hex.substr(1,2), hex.substr(3, 2), hex.substr(5,2)];
    return [parseInt(result[0], 16), parseInt(result[1], 16), parseInt(result[2], 16)];
};

function getColor(baseColor, i, max){
    var amt = (maxColorDif/max)*i;
    return "rgb("+Math.round(baseColor[0]-(baseColor[0]*amt))+", "+Math.round(baseColor[1]-(baseColor[1]*amt))+", "+Math.round(baseColor[2]-(baseColor[2]*amt))+")";
}