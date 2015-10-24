var PoliceService = require("./policeService");
var eyes = require("eyes");

var location = {
	lat: 53.4800,
	lon: -2.2400	
};

var policeService = new PoliceService();

policeService.getCrimeStats(location, "2015-08", 250)
	.then(function (data) {
		eyes.inspect(data);		
	})
	.catch(function (error) {
		console.dir(error);
	});

policeService.getAllCrimeStats(location, 250)
	.then(function (data) {

    var forceastForOct = policeService.forecastCrimeNumbers(data, "2015-10")

    console.log("Risk based on forceast: ")
		console.log(policeService.calculateRisk(forceastForOct));

    var highestMonth = policeService.findHighestMonth(data)

    console.log("Risk based on Highest Month: " + highestMonth.month)
    console.log(policeService.calculateRisk(highestMonth.numberOfCrimes));

    var currentMonth = policeService.crimesInLatestMonth(data)

    console.log("Risk based on Current Month: " + currentMonth.month)
    console.log(policeService.calculateRisk(currentMonth.numberOfCrimes));

	})
	.catch(function (error) {
		console.dir(error);
	});

policeService.getAllCrimeStatsAndAnalysis(location, 250)
  .then(function (data) {

    eyes.inspect(data);

  })
  .catch(function (error) {
    console.dir(error);
  });