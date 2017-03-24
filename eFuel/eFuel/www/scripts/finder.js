(function(window) {
    var Finder = window.Finder = {
        getAllStationsInRadius: function(lat, lng, radius, plugType, callback) {
            var API_Key = '2a83e75cf3ceb116f8f70a553586d9d0'
            var listOfChargepoints;

            var getJSON = function(url) {
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
            };
            getJSON('https://api.goingelectric.de/chargepoints/?key=' + API_Key +
                '&lng=' + lng + '&lat=' + lat + '&radius=' + radius + '&orderby=distance&plugs=' + plugType).then(function(data) {
                    var coords = data.chargelocations.map(function(chargelocation) {
                        return chargelocation.coordinates;
                    });

                    callback(null, coords);
            }, function(status) { //error detection....
                alert('Something went wrong.');
            });
            return listOfChargepoints;
        }
    }
})(window);
