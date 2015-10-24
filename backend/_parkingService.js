var ParkingService = require("./parkingService");

var location = {
	lat: 53.4800,
	lon: -2.2400	
};

var parkingService = new ParkingService();

parkingService.getNearbyCarParks(location)
	.then(function (data) {
		console.dir(data);		
	})
	.catch(function (error) {
		console.dir(error);
	});
