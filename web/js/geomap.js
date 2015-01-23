window.GeoMap = Stapes.subclass({
    constructor : function(data, container, color) {
        this.data = data;
        this.container = container;
        this.color = color;
        this.markers = [];

        var southWest = L.latLng(54.0041711, 8.6904297);    // zuidWest (x,y)
        var northEast = L.latLng(49.72950155, 1.8674316);   // noordOost (x,y)
        var bounds = L.latLngBounds(southWest, northEast);  // grenzen(zuidWest, noordOost)

        this.map = L.map(this.container[0], {
            center: [52.1831949, 5.1525879],
            zoom: 7.5,
            maxZoom: 9,     //maximum inzoomen
            minZoom: 7,         //maximum uitzoomen
            maxBounds: bounds,  //maximum grenzen
            zoomControl: false,
            scrollWheelZoom: false,
            touchZoom: false
        });

        this.map.addControl(L.control.zoom({position: 'bottomright'}));
    },

    addMarker : function(lat, long, val, amount, gemeenteID, color){
        var myIcon = L.divIcon({
            className:  "marker",
            iconSize:   [Math.round(7+val*0.4), Math.round(7+val*0.4)],
            popupAnchor: [0, (-Math.round(20+amount*0.4)/2)]
        });

        var alpha = 0.5;

        var marker = new L.marker(
            [lat, long],
            {icon: myIcon}
        )
        .bindPopup(API.getGemeenteFromID(gemeenteID))
        .addTo(this.map);

        $(marker).data("gemeenteID", gemeenteID);
        $(marker._icon).css("backgroundColor", color);

        marker.on('mouseover', function () {
            this.openPopup();
        });

        marker.on('mouseout', function () {
            this.closePopup();
        });

        marker.on('click', function () {
            filterGemeente($(this).data("gemeenteID"));
        });

        this.markers.push(marker);
    },

    addMarkers : function() {
        var self = this;

        this.data.forEach(function(e){
            var gemeente = e.gemeente;
            var amount = e.amount;
            var val = 0;

            for (var i=0; i<amount; i++){
                val += e.data[i];
            }

            var latlong = e.latlong;

            self.addMarker(latlong[0], latlong[1], val, amount, gemeente, _this.color);
        });
    }
});