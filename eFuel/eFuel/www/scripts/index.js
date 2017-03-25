document.addEventListener('deviceready', onDeviceReady.bind(this), false);

var DEMO_MODUS = true;

function getLocation(callback) {
    if(DEMO_MODUS) {
        setTimeout(function() {
            callback({
                lat: 49.0122978,
                lng: 12.0893348
            });
        }, 500);
    } else {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                callback({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            },
            function(error) {
                alert("Error getting golocation: " + error);
            }, {
                timeout: 10000
            }
        );
    }
}

function addCarMarker(lat, lng) {
    Map.addMarker(lat, lng, Map.ICON_CAR);
}

function addStationMarker(lat, lng) {
    Map.addMarker(lat, lng, Map.ICON_STATION);
}

function setMarker(radius, plugType, showRoute) {
    $.mobile.loading("show");
    $(".Panel").panel("close");

    getLocation(function(position) {
        Finder.getAllStationsInRadius(position.lat, position.lng, radius, plugType,
            function(err, stations) {
                $.mobile.loading("hide");

                Map.removeMarkers();
                Map.addMarker(position.lat, position.lng, Map.ICON_CAR);

                if (showRoute) {
                    var bestMatch = stations[0];
                    if (!bestMatch) {
                        alert("Ups, wir konnten keine Station finden.");
                        return;
                    }

                    var bestMarker = Map.addMarker(
                        bestMatch.lat,
                        bestMatch.lng,
                        bestMatch.isElectro ? Map.ICON_STATION : Map.ICON_GASSTATION,
                        bestMatch.name
                    );

                    Map.showMarkerInfo(bestMarker);
                    Map.showLocationTo(position.lat, position.lng, bestMatch.lat, bestMatch.lng);

                    stations.shift();
                }

                stations.forEach(function(station) {
                    Map.addMarker(
                        station.lat,
                        station.lng,
                        station.isElectro ? Map.ICON_STATION : Map.ICON_GASSTATION,
                        station.name
                    );
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

    $("#connect-popup").on("popupafteropen", function() {
        setTimeout(function() {
            $("#connect-popup .ui-content").html($("#connect-popup-content"));
            $("#connect-popup").popup("reposition", {});

            $("#connect-popup li").click(function(ev) {
                $("#connect-popup").popup("close");
                $(".Panel").panel("open");

                $("#connected-car").css("display", "initial");
                $("#connected-car strong").text(ev.target.textContent);

                setTimeout(function() {
                    cordova.plugins.notification.local.schedule({
                        title: "Geringe Fahrzeugreichweite",
                        text: "Nächste Tankstelle ganz in der Nähe"
                    })
                }, 4000);
            });
        }, 1000);
    })

    $(".SearchPopup__submit").click(function() {
        var radius = parseFloat($("[name='distance-slider']").val(), 10);
        var plugType = $("[name='plug-type']").val();

        setMarker(radius, plugType, true);
    });

    cordova.plugins.notification.local.on("click", function() {
        setMarker(50, "Elektro", true);
    })

    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);

    refreshLocation();
};

function onPause() {};

function onResume() {};
