/* jshint -W097 */
"use strict";

/* global module */
/* global process */
/* global require */

var _ = require("lodash");
var geolib = require("geolib");
var Promise = require("Promise");
var request = require("request");

function mapper (crime) {
  return crime;
}

function getCrimeStats(location, date, distance)
{
  return new Promise(function (resolve, reject) {
    distance = distance || 500;
    
    var options = {
      uri: "https://data.police.uk/api/crimes-street/vehicle-crime",
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

        return distance <= 500;
      });

      resolve({
        date: date,
        crimes: _.map(nearbyCrimes, mapper)
      });
    });
  });
}

function getAllCrimeStats (location) {
  var policeService = new PoliceService();
  var promises = [];

  var dates = [
    "2015-08",
    "2015-07",
    "2015-06",
    "2015-05",
    "2015-04",
    "2015-03"
  ];

  _.each(dates, function (date) {
    promises.push(policeService.getCrimeStats(location, date));
  });

  return Promise.all(promises);
}

function PoliceService () {	
}

PoliceService.prototype.getCrimeStats = getCrimeStats;
PoliceService.prototype.getAllCrimeStats = getAllCrimeStats;

module.exports = PoliceService;
