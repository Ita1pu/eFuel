// Eine Einführung zur leeren Vorlage finden Sie in der folgenden Dokumentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// So debuggen Sie Code beim Seitenladen in Ripple oder auf Android-Geräten/-Emulatoren: Starten Sie die App, legen Sie Haltepunkte fest,
// und führen Sie dann "window.location.reload()" in der JavaScript-Konsole aus.

"use strict";

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function getLocation(callback) {
    navigator.geolocation.getCurrentPosition(callback,
        function (eror) {
            alert("Error getting golocation!");
        });
}

var map;

function initMap() {
    getLocation(function (position) {
        var point = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
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

        addCarMarker(position.coords.latitude, position.coords.longitude);
    });

    /*
    var directionsRenderer, directionsService;
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    var marker = new google.maps.Marker({
        position: point,
        map: map,
        title: "Point",
        icon: "images/icons/ic_power_black_24dp_1x.png"
    });

    var request = {
        origin: point,
        destination: "Regensburg Ruderzentrum",
        travelMode: google.maps.TravelMode.WALKING
    };
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
        }
    });*/
}

function addMarker(lat, lng, icon) {
    var point = {
        lat: lat,
        lng: lng
    };

    var marker = new google.maps.Marker({
        position: point,
        map: map,
        title: "Point",
        icon: icon
    });
}

function addCarMarker(lat, lng) {
    addMarker(lat, lng, "images/car.svg");
}

function addStationMarker(lat, lng) {
    addMarker(lat, lng, "images/station.svg");
}

function onDeviceReady() {
    $(".Panel__toggle-btn").click(function () {
        $(".Panel").panel("toggle")
    });

    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);
};

function onPause() {
    // TODO: Diese Anwendung wurde ausgesetzt. Speichern Sie hier den Anwendungszustand.
};

function onResume() {
    // TODO: Diese Anwendung wurde erneut aktiviert. Stellen Sie hier den Anwendungszustand wieder her
};
