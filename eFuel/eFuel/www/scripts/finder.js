(function(window) {
    function getJSON(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                var status = xhr.status;
                if (status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(status);
                }
            };
            xhr.send();
        });
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    var gasTypesShort = {
        "Super": "e5",
        "Diesel": "dsl",
        "E10": "e10"
    }

    var Finder = window.Finder = {
        getAllStationsInRadius: function(lat, lng, radius, plugType, callback) {
            if (["Super", "Diesel", "E10"].indexOf(plugType) > -1) {
                Finder.getAllGasStationsInRadius(lat, lng, radius, plugType, callback);
            } else {
                if (plugType === "Elektro") plugType = "";
                Finder.getAllElectroStationsInRadius(lat, lng, radius, plugType, callback);
            }
        },

        getAllGasStationsInRadius: function(lat, lng, radius, gasType, callback) {
            var url = "http://karte.mittelbayerische.de/api/6/datasets/114/";
            var gasTypeShort = gasTypesShort[gasType];

            getJSON(url).then(function(data) {
                var stations = data.entries.filter(function(entry) {
                        return entry.location != null && entry[gasTypeShort]
                    }).map(function(entry) {
                        entry.distance = getDistanceFromLatLonInKm(lat, lng, entry.location.lat, entry.location.lng);
                        return entry
                    }).filter(function(entry) {
                        return entry.distance < radius;
                    }).sort(function(entry1, entry2) {
                        return entry1.distance - entry2.distance;
                    }).map(function(entry) {
                        return {
                            lat: entry.location.lat,
                            lng: entry.location.lng,
                            name: entry.name,
                            isElectro: false,
                        }
                    });

                callback(null, stations);
            });
        },

        getAllElectroStationsInRadius: function(lat, lng, radius, plugType, callback) {
            var API_Key = '2a83e75cf3ceb116f8f70a553586d9d0'
            var url = 'https://api.goingelectric.de/chargepoints/?key=' + API_Key +
                '&lng=' + lng +
                '&lat=' + lat +
                '&radius=' + radius +
                '&plugs=' + plugType +
                '&orderby=distance'

            getJSON(url).then(function(data) {
                var stations = data.chargelocations.map(function(location) {
                    return {
                        lat: location.coordinates.lat,
                        lng: location.coordinates.lng,
                        name: location.name,
                        isElectro: true,
                    }
                });

                callback(null, stations);
            }, function(status) { //error detection....
                alert('Something went wrong.');
            });
        }
    }
})(window);
