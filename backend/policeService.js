/* jshint -W097 */
"use strict";

/* global module */
/* global process */
/* global require */

var _ = require("lodash");
var geolib = require("geolib");
var Promise = require("Promise");
var request = require("request");
var lsq = require('least-squares');

function mapper (crime) {
  return crime;
}

function getCrimeStats(location, date, distance, category)
{
  return new Promise(function (resolve, reject) {
    distance = distance || 500;
    category = category || "vehicle-crime";
    
    var options = {
      uri: "https://data.police.uk/api/crimes-street/" + category,
      qs: {
        lat: location.lat,
        lng: location.lon,
        date: date
      }
    };
    
    request(options, function (error, response, data) {
      if (error) {
        reject(error);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(response.statusCode);
        return;
      }

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
       
        var distance = geolib.getDistance(point1, point2);

        crime.location.distance = distance;

        return distance <= 500;
      });

      resolve({
        date: date,
        crimes: _.map(nearbyCrimes, mapper)
      });
    });
  });
}

function getAllCrimeStats (location, distance) {
  distance = distance || 500;
  var policeService = new PoliceService();
  var promises = [];

  var dates = [
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
    "2014-10",
    "2014-09",
  ];

  _.each(dates, function (date) {
    promises.push(policeService.getCrimeStats(location, date, distance));
  });

  return Promise.all(promises);
}

function dateToXPoint(date)
{
  var arr = date.split("-");

  return (arr[0] * 12) + (arr[1] * 1);
}

function forecastCrimeNumbers (data, monthToPredict)
{
  monthToPredict = monthToPredict || "2015-10";

  var x = [];
  var y = [];

  _.each(data, function(dateResult)
  {
    console.log(dateToXPoint(dateResult.date) + " => " + dateResult.crimes.length)

    x.push(dateToXPoint(dateResult.date));
    y.push(dateResult.crimes.length);
  });

  var f = lsq(x, y, {})

  var xPointOfPrediction = dateToXPoint(monthToPredict);

  return f(xPointOfPrediction); 
}

function PoliceService () {	
}

PoliceService.prototype.getCrimeStats = getCrimeStats;
PoliceService.prototype.getAllCrimeStats = getAllCrimeStats;
PoliceService.prototype.forecastCrimeNumbers = forecastCrimeNumbers;

module.exports = PoliceService;
