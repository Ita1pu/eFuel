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
        addCarMarker(position.coords.latitude, position.coords.longitude);

        // add station marker
    });
}

function onDeviceReady() {
    $(".Panel__toggle-btn").click(function () {
        $(".Panel").panel("toggle");
    });

    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);

    refreshLocation();
};

function onPause() {};

function onResume() {};
