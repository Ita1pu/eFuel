
// Define class station
// Set id, name, coord_lat, coord_lng as Values in constructor
// Set arrPlugs as array of Plug objects in constructor
// Set Address as Object in constructor
// Set distance via setDistance()
function Station(id, name, coord_lat, coord_lng, arrPlugs, address)
{
	this.id = id;
	this.name = name;
	this.Coordinates = new Coordinates(coord_lat, coord_lng);
	this.arrPlugs = arrPlugs;
	this.Address = address;
	this.distance;
}
Station.prototype.getId = function()
{
	return this.id;
}
Station.prototype.getName = function()
{
	return this.name;
}
Station.prototype.getCoordinates = function()
{
	return this.Coordinates;
}
Station.prototype.getAllPlugs = function()
{
	return this.arrPlugs;
}
Station.prototype.getPlug = function(int id)
{
	return this.arrPlugs[id];
}
Station.prototype.getAddress = function()
{
	return this.Address;
}
Station.prototype.getDistance = function()
{
	return this.distance;
}
Station.prototype.setDistance = function(distance)
{
	this.distance = distance;
}

// Set coordinates lat and lng via constructor
function Coordinates(lat, lng)
{
	this.lat = lat;
	this.lng = lng;
}
Coordinates.prototype.getLat = function()
{
	return this.lat;
}
Coordinates.prototype.getLng = function()
{
	return this.lng;
}

function Plugs(id, type, power)
{
	this.id = id;
	this.type = type;
	this.power = power;
}
Plugs.prototype.getId = function()
{
	return this.id;
}
Plugs.prototype.getType = function()
{
	return this.type;
}
Plugs.prototype.getPower = function()
{
	return this.power;
}


function Address(street, streetNo, zip, city, country)
{
	this.street = street;
	this.streetNo = streetNo;
	this.zip = zip;
	this.city = city;
	this.country = country;
}
Address.prototype.getStreet = function()
{
	return this.street;
}
Address.prototype.getStreetNo = function()
{
	return this.streetNo;
}
Address.prototype.getZip = function()
{
	return this.zip;
}
Address.prototype.getCity = function()
{
	return this.city;
}
Address.prototype.getCountry = function()
{
	return this.country;
}