// Eine Einführung zur leeren Vorlage finden Sie in der folgenden Dokumentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// So debuggen Sie Code beim Seitenladen in Ripple oder auf Android-Geräten/-Emulatoren: Starten Sie die App, legen Sie Haltepunkte fest,
// und führen Sie dann "window.location.reload()" in der JavaScript-Konsole aus.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        //$(".Panel").panel("open");

        $(".Panel__toggle-btn").click(function() {
            $(".Panel").panel("toggle")
        });

        $(".SearchPopup__submit").click(function() {
            $.mobile.loading("show")
        });


        // Verarbeiten der Cordova-Pause- und -Fortsetzenereignisse
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        // TODO: Cordova wurde geladen. Führen Sie hier eine Initialisierung aus, die Cordova erfordert.
        /*var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        cordova.plugins.notification.local.schedule({
            title: "New Message"
        });

        var onSuccess = function (position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                  'Longitude: ' + position.coords.longitude + '\n' +
                  'Altitude: ' + position.coords.altitude + '\n' +
                  'Accuracy: ' + position.coords.accuracy + '\n' +
                  'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                  'Heading: ' + position.coords.heading + '\n' +
                  'Speed: ' + position.coords.speed + '\n' +
                  'Timestamp: ' + position.timestamp + '\n');
        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                  'message: ' + error.message + '\n');
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };

    function onPause() {
        // TODO: Diese Anwendung wurde ausgesetzt. Speichern Sie hier den Anwendungszustand.
    };

    function onResume() {
        // TODO: Diese Anwendung wurde erneut aktiviert. Stellen Sie hier den Anwendungszustand wieder her
    };


})();

var map;
var directionsRenderer, directionsService;

function initMap() {
    var point = {
        lat: 49.012499,
        lng: 12.088931
    };
    map = new google.maps.Map(document.getElementById("Map__container"), {
        center: point,
        zoom: 13,
        streetViewControl: false,
        mapTypeControl: false,
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
    directionsRenderer.setMap(map);

    var marker = new google.maps.Marker({
        position: point,
        map: map,
        title: "Point"
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
    });

}
