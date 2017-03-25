(function(window) {

    var mapInitialized = false;
    var markersToDraw = [];
    var markers = [];
    var map = null;
    var directionsRenderer = null;
    var directionsService = null;
    var openInfoWindow = null;

    var Map = window.Map = {
        ICON_CAR: "images/car.svg",
        ICON_STATION: "images/station.svg",
        ICON_GASSTATION: "images/gasstation.svg",
        ICON_EMPTY: "images/empty.svg",

        addMarker: function(lat, lng, icon, infoText) {
            if (!mapInitialized) {
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

            if (infoText) {
                var infoWindow = new google.maps.InfoWindow({
                    content: infoText
                });

                marker.infoWindow = infoWindow;

                marker.addListener("click", function() {
                    Map.showMarkerInfo(marker)
                });
            }

            markers.push(marker);

            return marker;
        },

        removeMarkers: function() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }

            markers = [];
        },

        showLocationTo: function(fromLat, fromLng, toLat, toLng) {
            var request = {
                origin: {
                    lat: fromLat,
                    lng: fromLng
                },
                destination: {
                    lat: toLat,
                    lng: toLng
                },
                travelMode: google.maps.TravelMode.DRIVING
            };

            directionsService.route(request, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                }
            });
        },

        showMarkerInfo: function(marker) {
            if (openInfoWindow) openInfoWindow.close();
            openInfoWindow = marker.infoWindow;
            marker.infoWindow.open(map, marker);
        }
    }

    window.onGoogleMapsReady = function() {
        var point = {
            lat: 49.0150985,
            lng: 12.091399,
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

        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setOptions({
            markerOptions: {
                icon: Map.ICON_EMPTY,
            }
        })
        directionsRenderer.setMap(map);

        mapInitialized = true;

        markersToDraw.forEach(function(marker) {
            Map.addMarker.apply(Map, marker)
        })
    }

})(window);
