/*Function returns list of Gas stations*/
// Lat: Latitude(Coordinate)
// Lng: Longitude(Coordinate)
// Radius: Range around the Location for searching the GasStations
function getAllStationsInRadius(lat, lng, radius,callback)
{
  var API_Key = '2a83e75cf3ceb116f8f70a553586d9d0';
  var listOfChargepoints = [];
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

  //HTTP Request
  getJSON('https://api.goingelectric.de/chargepoints/?key='+API_Key+
      '&lng=' + lng + '&lat=' + lat + '&radius=' + radius +'&orderby=distance').then(function(data) {
      for (var i = data.chargelocations.length - 1; i >= 0; i--) {
          var temp;
          temp = data.chargelocations[i];
          for (var j = temp.chargepoints.length - 1; j >= 0; j--) {
              tempCp = temp.chargepoints[j]
              var plugs =[];
              plugs.push(new Plugs(j,tempCp.type,tempCp.power));
          }
          listOfChargepoints.push(new Station(temp.ge_id,temp.name,temp.coordinates.lat,temp.coordinates.lng,plugs,temp.address));
      }
          callback(listOfChargepoints);
      }, function(status) { //error detection....
        alert('Something went wrong.');
      });
}