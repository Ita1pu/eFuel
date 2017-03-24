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

function setMarker(radius, callback) {
    getLocation(function (position) {
        Finder.getAllStationsInRadius(position.coords.latitude, position.coords.longitude, radius,
            function (err, stations) {
                Map.removeMarkers();
                Map.addMarker(position.coords.latitude, position.coords.longitude, Map.ICON_CAR);

                let bestMatch = stations[0];
                if (!bestMatch) {
                    alert("Ups, wir konnten keine Station finden.");
                    return;
                }

                Map.showLocationTo(position.coords.latitude, position.coords.longitude, bestMatch.lat, bestMatch.lng);

                stations.forEach(function (stations) {
                    Map.addMarker(stations.lat, stations.lng, Map.ICON_STATION);
                });

                if (typeof callback != "undefined")
                    callback();
            });
    });
}

function refreshLocation() {
    var radius = 100; // fuel range in km
    setMarker(radius);
}

function onDeviceReady() {
    $(".Panel__toggle-btn").click(function () {
        $(".Panel").panel("toggle");
    });

    $(".SearchPopup__submit").click(function () {
        let radius = parseFloat($("[name='distance-slider']").val(), 10);
        setMarker(radius, function () {
            $(".Panel").panel("close");
        });
    });

    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);

    refreshLocation();
};

function onPause() {};

function onResume() {};
