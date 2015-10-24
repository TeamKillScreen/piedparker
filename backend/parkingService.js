/* jshint -W097 */
"use strict";

/* global module */
/* global process */
/* global require */

var Promise = require("Promise");
var request = require("request");

function getNearbyCarParks (location) {
	return new Promise(function (resolve, reject) {
		var devkey = process.env.TFGM_API_DEVKEY;
		var appkey = process.env.TFGM_API_APPKEY;
	
		if (!devkey || !appkey) {
			reject("Missing appkey or devkey.");
			return;				
		}
		
		var options = {
			url: "http://opendata.tfgm.com/api/carparks",
			headers: {
				devkey: devkey,
				appkey: appkey
			},
			qs: {
				latitude: location.lat,
				longitude: location.lon
			}
		};
		
		var callback = function (error, response, data) {
			if (error) {
				reject(error);
				return;
			}

			if (response.statusCode !== 200) {
				reject(response.statusCode);
				return;
			}

			resolve(data);
		};
		
		request(options, callback);		
	});
}

function ParkingService () {	
}

ParkingService.prototype.getNearbyCarParks = getNearbyCarParks;

module.exports = ParkingService;
