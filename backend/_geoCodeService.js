var GeoCodeService = require("./geoCodeService");
var eyes = require("eyes");

var location = {
	lat: 53.4800,
	lon: -2.2400	
};

var geoCodeService = new GeoCodeService();

geoCodeService.getAddress(location)
	.then(function (data) {
		eyes.inspect(data);
	})
	.catch(function (error) {
		console.dir(error);
	});

/*
geoCodeService.reverseGeoCode(location)
	.then(function (data) {
		eyes.inspect(data);
	})
	.catch(function (error) {
		console.dir(error);
	});
*/
