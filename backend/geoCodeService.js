/* jshint -W097 */
"use strict";

/* global module */
/* global process */
/* global require */

// node_modules
var eyes = require("eyes");
var Promise = require("Promise");
var request = require("request");
var util = require("util");

function getAddress (location) {
  return new Promise(function (resolve, reject) {
    var urlFormat = "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=%d,%d";
    var url = util.format(urlFormat, location.lat, location.lon);

    var options = {
        url: url
    };

    eyes.inspect(options);    

    request(options, function (error, response, data) {
      if (error) {
        reject(error);
        return;
      }

      if (response.statusCode !== 200) {
        reject(response.statusCode);
        return;
      }

      var result = JSON.parse(data);

      // eyes.inspect(result);
      
      // TODO: clean up.
      if (!result.results || !result.results.length) {
        reject("No results.");
        return;                      
      }
      
      var firstResult = result.results[0];
      
      resolve({
        formattedAddress: firstResult.formatted_address
      });
    });
  });   
}

function reverseGeoCode (location) {
    return new Promise(function (resolve, reject) {
        var headers = {
            "content-type": "application/x-www-form-urlencoded"
        };
        
        var options = {
            url: "https://api.postcodes.io/postcodes",
            method: "POST",
            headers: headers,
            form: {
                geolocations: [{
                    longitude: location.lon,
                    latitude: location.lat,
                }]
            }
        };
        
        // eyes.inspect(options);    
        
        request(options, function (error, response, data) {
            if (error) {
                reject(error);
                return;
            }
        
            if (response.statusCode !== 200) {
                reject(response.statusCode);
                return;
            }

            var result = JSON.parse(data).result;

            // eyes.inspect(result);
    
            // TODO: clean up.
            if (!result.length || !result[0].result || !result[0].result.length) {
                reject("No results.");
                return;            
            }
            
            resolve(result[0].result[0]);
        });
    });
}

function GeoCodeService () {	
}

GeoCodeService.prototype.reverseGeoCode = reverseGeoCode;
GeoCodeService.prototype.getAddress = getAddress;

module.exports = GeoCodeService;
