function PieChart(sourceData, q, g, side, container, color){
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
                    .attr("fill", function(d, i){return util.getColor(_this.color, i, _this.data.length)})
                    .attr("d", arc);

            arcs.append("text")
                    .attr("transform", function(d){
                            d.outerRadius = outerRadius + 50;
                            d.innerRadius = outerRadius + 45;
                            return "translate("+arc.centroid(d)+")";
                        })
                    .attr("text-anchor", "middle")
                    .style("fill", function(d, i){return util.getColor(_this.color, i, _this.data.length)})
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