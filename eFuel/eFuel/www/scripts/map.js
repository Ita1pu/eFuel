(function(window) {

    var mapInitialized = false;
    var markersToDraw = [];
    var markers = [];
    var map = null;

    var Map = window.Map = {
        ICON_CAR: "images/car.svg",
        ICON_STATION: "images/station.svg",

        addMarker: function(lat, lng, icon) {
            if(!mapInitialized) {
                markersToDraw.push(arguments);
                return;
            }

            var point = {
                lat: lat,
                lng: lng
            };

            var marker = new google.maps.Marker({
                position: point,
                map: map,
                icon: icon
            });

            markers.push(marker);
        },

        removeMarkers: function() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }

            markers = [];
        }
    }

    window.onGoogleMapsReady = function () {
        getLocation(function (position) {
            var point = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }

            map = new google.maps.Map(document.getElementById("Map__container"), {
                center: point,
                zoom: 13,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                styles: [{
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "landscape",
                    elementType: "labels",
                    stylers: [{
                        "visibility": "off"
                    }]
                }]
            });

            mapInitialized = true;

            markersToDraw.forEach(function (marker) {
                Map.addMarker.apply(Map, marker)
            })
        });
    }

})(window);
