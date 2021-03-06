/* jshint -W097 */
"use strict";

/* global module */
/* global process */
/* global require */

var _ = require("lodash");
var geolib = require("geolib");
var Promise = require("promise");
var request = require("request");
var lsq = require('least-squares');
var Firebase = require("firebase");
var md5 = require("md5");

function mapper (crime) {
  return crime;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCrimeStats(location, date, distance, category)
{
  return new Promise(function (resolve, reject) {
    distance = distance || 500;
    category = category || "vehicle-crime";
    
    var firebaseCache = new Firebase("https://piedparker.firebaseio.com/policecache");

    var hash = md5(location.lat + ":" + location.lon + ":" + date + ":" + category);

    firebaseCache.once("value",function(dataSnapshot) {
      if(dataSnapshot.hasChild(hash))
      {
        var data = dataSnapshot.child(hash).val();

        var crimes = JSON.parse(data);
            
        var nearbyCrimes = crimes.filter(function (crime) {
          var point1 = {
              latitude: location.lat,
              longitude: location.lon
            };

          var point2 = {
              latitude: crime.location.latitude,
              longitude: crime.location.longitude
            };
         
          var calculatedDistance = geolib.getDistance(point1, point2);

          crime.location.distance = calculatedDistance;

          return calculatedDistance <= distance;
        });

        resolve({
          date: date,
          crimes: _.map(nearbyCrimes, mapper)
        });
      }
      else
      {
        var options = {
          uri: "https://data.police.uk/api/crimes-street/" + category,
          qs: {
            lat: location.lat,
            lng: location.lon,
            date: date
          }
        };
        
        setTimeout(function() {
          request(options, function (error, response, data) {
            if (error) {
              reject(error);
              return;
            }
            
            if (response.statusCode !== 200) {
              reject(response.statusCode);
              return;
            }

            dataSnapshot.child(hash).ref().set(data);

            var crimes = JSON.parse(data);
            
            var nearbyCrimes = crimes.filter(function (crime) {
              var point1 = {
                  latitude: location.lat,
                  longitude: location.lon
                };

              var point2 = {
                  latitude: crime.location.latitude,
                  longitude: crime.location.longitude
                };
             
              var calculatedDistance = geolib.getDistance(point1, point2);

              crime.location.distance = calculatedDistance;

              return calculatedDistance <= distance;
            });

            resolve({
              date: date,
              crimes: _.map(nearbyCrimes, mapper)
            });
          });
        }, getRandomInt(0,1000));

      }
    });
    
  });
}

function getAllCrimeStats (location, distance, category) {
  distance = distance || 500;
  category = category || "vehicle-crime";

  var policeService = new PoliceService();
  var promises = [];

  var dates = [
    "2015-10",
    "2015-09",
    "2015-08",
    "2015-07",
    "2015-06",
    "2015-05",
    "2015-04",
    "2015-03",
    "2015-02",
    "2015-01",
    "2014-12",
    "2014-11",
  ];

  _.each(dates, function (date) {
      promises.push(policeService.getCrimeStats(location, date, distance, category));
  });

  return Promise.all(promises);
}

function getAllCrimeStatsAndAnalysis (location, distance, category) {

  distance = distance || 500;
  category = category || "vehicle-crime";

  return new Promise(function (resolve, reject) {
    getAllCrimeStats(location, distance, category).then(function (data) {
      var monthToForecast = "2015-12";

      var futureForecast = forecastCrimeNumbers(data, monthToForecast);
      var futureForecastRisk = calculateRisk(futureForecast);

      var highestMonth = findHighestMonth(data);
      var highestMonthRisk = calculateRisk(highestMonth.numberOfCrimes);

      var currentMonth = crimesInLatestMonth(data);
      var currentMonthRisk = calculateRisk(currentMonth.numberOfCrimes);

      resolve({
        risk : {
          currentMonth : {
            month : currentMonth.month,
            risk : currentMonthRisk,
            numberOfCrimes : currentMonth.numberOfCrimes
          },
          highestMonth : {
            month : highestMonth.month,
            risk : highestMonthRisk,
            numberOfCrimes : highestMonth.numberOfCrimes
          },
          futureForecast : {
            month : monthToForecast,
            risk: futureForecastRisk,
            numberOfCrimes : futureForecast
          }
        },
        //raw : data
        //Disable raw data storage
        raw : {}
      }); 
    }).catch(function (error) {
      reject(error);
    });
  });
}

function calculateRisk(val)
{
  if (val > 10)
  {
    return "High";
  }
  else if (val > 5)
  {
    return "Medium";
  }
  else
  {
    return "Low";
  }
}

function dateToXPoint(date)
{
  var arr = date.split("-");

  return (arr[0] * 12) + (arr[1] * 1);
}

function forecastCrimeNumbers(data, monthToPredict)
{
  monthToPredict = monthToPredict || "2015-12";

  var x = [];
  var y = [];

  _.each(data, function(dateResult)
  {
    //console.log(dateToXPoint(dateResult.date) + " => " + dateResult.crimes.length)

    x.push(dateToXPoint(dateResult.date));
    y.push(dateResult.crimes.length);
  });

  if (x.length === 0)
    return 0;

  var f = lsq(x, y, {});

  var xPointOfPrediction = dateToXPoint(monthToPredict);

  var prediction = Math.round(f(xPointOfPrediction));

  if (prediction < 0)
    return 0;

  return prediction;
}

function findHighestMonth(data)
{
  var highestVal = 0;
  var highestMonth = "";

  _.each(data, function(month) {

    var numCrimes = month.crimes.length;

    if(numCrimes > highestVal)
    {
      highestMonth = month.date;
      highestVal = numCrimes;
    }
  });

  return { month: highestMonth, numberOfCrimes: highestVal };
}

function crimesInLatestMonth(data)
{
  var highestVal = 0;
  var highestMonth = "";
  var numCrimes = 0;

  _.each(data, function(month) {

    var monthDataPoint = dateToXPoint(month.date);

    if(monthDataPoint > highestVal)
    {
      highestMonth = month.date;
      highestVal = monthDataPoint;
      numCrimes = month.crimes.length;
    }
  });

  return { month: highestMonth, numberOfCrimes: numCrimes };
}


function PoliceService () {	
}

PoliceService.prototype.getCrimeStats = getCrimeStats;
PoliceService.prototype.getAllCrimeStats = getAllCrimeStats;
PoliceService.prototype.forecastCrimeNumbers = forecastCrimeNumbers;
PoliceService.prototype.findHighestMonth = findHighestMonth;
PoliceService.prototype.crimesInLatestMonth = crimesInLatestMonth;
PoliceService.prototype.calculateRisk = calculateRisk;
PoliceService.prototype.getAllCrimeStatsAndAnalysis = getAllCrimeStatsAndAnalysis;

module.exports = PoliceService;
