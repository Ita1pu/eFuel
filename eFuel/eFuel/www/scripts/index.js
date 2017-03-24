"use strict";

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function getLocation(callback) {
    navigator.geolocation.getCurrentPosition(callback,
        function (eror) {
            alert("Error getting golocation!");
        });
}

function addCarMarker(lat, lng) {
    Map.addMarker(lat, lng, Map.ICON_CAR);
}

function addStationMarker(lat, lng) {
    Map.addMarker(lat, lng, Map.ICON_STATION);
}

function refreshLocation() {
    getLocation(function (position) {
        var fuelRange = position.coords.speed; // fuel range in km

        Map.removeMarkers();

        Finder.getAllStationsInRadius(position.coords.latitude, position.coords.longitude, fuelRange, function (err, coords) {
            coords.forEach(function (coord) {
                Map.addMarker(coord.lat, coord.lng, Map.ICON_STATION);
            });
        });

        addCarMarker(position.coords.latitude, position.coords.longitude);
    });
}

function onDeviceReady() {
    $(".Panel__toggle-btn").click(function () {
        $(".Panel").panel("toggle");
    });

    $(".SearchPopup__submit").click(function () {
        let radius = parseFloat($("[name='distance-slider']").val(), 10);

        getLocation(function(position) {
            var posLat = position.coords.latitude;
            var posLng = position.coords.longitude;
            Finder.getAllStationsInRadius(posLat, posLng, radius, function (err, coords) {
                Map.removeMarkers();
                Map.addMarker(posLat, posLng, Map.ICON_CAR);

                let bestMatch = coords[0];
                if(!bestMatch) {
                    alert("Ups, wir konnten keine Station finden.");
                    return;
                }

                Map.showLocationTo(posLat, posLng, bestMatch.lat, bestMatch.lng);

                coords.forEach(function (coord) {
                    Map.addMarker(coord.lat, coord.lng, Map.ICON_STATION);
                });
            });
        });
    });

    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);

    refreshLocation();
};

function onPause() {};

function onResume() {};
