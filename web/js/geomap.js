window.GeoMap = Stapes.subclass({
    constructor : function(data, el, color) {
        this.data = data;
        this.color = color;

        var southWest = L.latLng(54.0041711, 8.6904297);    // zuidWest (x,y)
        var northEast = L.latLng(49.72950155, 1.8674316);   // noordOost (x,y)
        var bounds = L.latLngBounds(southWest, northEast);  // grenzen(zuidWest, noordOost)

        this.map = L.map(el, {
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

        _.each(this.data, this.addMarker, this);
    },

    addMarker : function(gemeente) {
        var self = this;
        var size = gemeente.respondents;

        var icon = L.divIcon({
            className   :  "marker",
            iconSize    : [Math.round(7 + size *0.4), Math.round(7 + size * 0.4)],
            popupAnchor : [0, (-Math.round(20+size*0.4)/2)]
        });

        var alpha = 0.5;

        var marker = new L.marker(
            [gemeente.lat, gemeente.lon],
            {icon: icon}
        )
        .bindPopup(gemeente.gemeente)
        .addTo(this.map);

        $(marker).data("gemeente", gemeente.gemeente);
        $(marker._icon).css("backgroundColor", this.color);

        marker.on('mouseover', function () {
            this.openPopup();
        });

        marker.on('mouseout', function () {
            this.closePopup();
        });

        marker.on('click', function () {
            self.emit('gemeenteselect', gemeente.gemeente);
        });
    }
});