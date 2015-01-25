function BarChart(sourceData, q, g, side, container, color){
    this.data = [];
    this.container = $(container);
    this.color = util.hexToRgb(color);
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
                    .style("fill", function(d, i){return util.getColor(_this.color, i, _this.data.length)});
                    //.style("fill", _this.color);

            bar.append("text")
                    .attr("x", (x.rangeBand()/2)+margin.left)
                    .attr("y", function(d){return y(d.value)-20+margin.top;})
                    .attr("dy", "0.75em")
                    .style("text-anchor", "middle")
                    .text(function(d){return d.value;})
                    .style("fill", function(d, i){return util.getColor(_this.color, i, _this.data.length)});
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