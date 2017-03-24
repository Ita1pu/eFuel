/*Function: Search shortest route for a list of stations*/
function getShortestRoute(lat, lng, radius)
{
	getAllStationsInRadius(lat, lng, radius, function (stations) {
		
		var origin1 = new google.maps.LatLng(lat, lng);
		var destination = [];
		
		var max = 0;
		stations.forEach(function (stat) {
			if(max++ < 20)
			{
				var coord = stat.getCoordinates();
				destination.push(new google.maps.LatLng(coord.lat, coord.lng));
			}
		});
		
		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		{
			origins: [origin1],
			destinations: destination,
			travelMode: google.maps.TravelMode.DRIVING,
		}, callback);

		
		
		function callback(response, status) {

			var shortestStation = stations[0];
					
			//Row's
			for(var i=0; i<response.rows.length; i++)
			{
				shortestStation.setDistance(response.rows[i].elements[0].distance.value);
				
				//Element's
				for(var j=1; j<response.rows[i].elements.length; j++)
				{					
					if(shortestStation.getDistance() > response.rows[i].elements[j].distance.value)
					{
						shortestStation = stations[j];
						shortestStation.setDistance(response.rows[i].elements[j].distance.value);
					}
				}
			}

			alert("Last:" + shortestStation.getDistance());
		}
	});	
}