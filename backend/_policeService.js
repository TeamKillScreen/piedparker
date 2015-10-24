var PoliceService = require("./policeService");
var eyes = require("eyes");

var location = {
	lat: 53.4800,
	lon: -2.2400	
};

var policeService = new PoliceService();

policeService.getCrimeStats(location, "2015-08")
	.then(function (data) {
		eyes.inspect(data);		
	})
	.catch(function (error) {
		console.dir(error);
	});

policeService.getAllCrimeStats(location)
	.then(function (data) {
		console.log(policeService.forecastCrimeNumbers(data, "2015-10"));
	})
	.catch(function (error) {
		console.dir(error);
	});
