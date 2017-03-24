"use strict";

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function getLocation(callback) {
    navigator.geolocation.getCurrentPosition(callback,
        function(eror) {
            alert("Error getting golocation!");
        });
}

function addCarMarker(lat, lng) {
    Map.addMarker(lat, lng, Map.ICON_CAR);
}

function addStationMarker(lat, lng) {
    Map.addMarker(lat, lng, Map.ICON_STATION);
}

function setMarker(radius, plugType, showRoute) {
    getLocation(function(position) {
        Finder.getAllStationsInRadius(position.coords.latitude, position.coords.longitude, radius, plugType,
            function(err, stations) {
                Map.removeMarkers();
                Map.addMarker(position.coords.latitude, position.coords.longitude, Map.ICON_CAR);

                if (showRoute) {
                    let bestMatch = stations[0];
                    if (!bestMatch) {
                        alert("Ups, wir konnten keine Station finden.");
                        return;
                    }

                    Map.showLocationTo(position.coords.latitude, position.coords.longitude, bestMatch.lat, bestMatch.lng);
                }

                stations.forEach(function(station) {
                    Map.addMarker(station.lat, station.lng, Map.ICON_STATION, station.name);
                });
            });
    });
}

function refreshLocation() {
    var radius = 100; // fuel range in km
    setMarker(radius, "", false);
}

function onDeviceReady() {
    $(".Panel__toggle-btn").click(function() {
        $(".Panel").panel("toggle");
    });

    $(".Panel a").click(function() {
        $(".Panel").panel("close");
    });

    $(".SearchPopup__submit").click(function() {
        let radius = parseFloat($("[name='distance-slider']").val(), 10);
        let plugType = $("[name='plug-type']").val();

        setMarker(radius, plugType, true);
    });

    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);

    refreshLocation();
};

function onPause() {};

function onResume() {};
