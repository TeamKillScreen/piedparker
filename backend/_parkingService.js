var ParkingService = require("./parkingService");
var eyes = require("eyes");

var location = {
	lat: 53.4800,
	lon: -2.2400	
};

var parkingService = new ParkingService();

parkingService.getParkingStats(location)
	.then(function (data) {
		if (data.length) {
			eyes.inspect(data);
		}
	})
	.catch(function (error) {
		console.dir(error);
	});

parkingService.getParkMarkCarParks(location)
  .then(function (data) {
    if (data) {
      eyes.inspect(data);
    }
  })
  .catch(function (error) {
    console.dir(error);
  });