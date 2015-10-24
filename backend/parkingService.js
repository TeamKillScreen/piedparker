/* jshint -W097 */
"use strict";

/* global module */
/* global process */
/* global require */

var _ = require("lodash");
var Promise = require("Promise");
var request = require("request");

function mapper (carPark) {
	return {
		id: carPark.Id,
		state: carPark.State,
		name: carPark.Name,
		lastUpdated: carPark.LastUpdated,
		location: {
			lat: carPark.Latitude,
			lon: carPark.Longitude
		},
		capacity: carPark.Capacity,
		spaces: carPark.SpacesNow,
		spacesIn30Minutes: carPark.PredictedSpaces30Mins,
		spacesIn60Minutes: carPark.PredictedSpaces60Mins
	};
}

function getParkingStats (location) {
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

			var json = JSON.parse(data);

			resolve(_.map(json, mapper));
		};
		
		request(options, callback);		
	});
}

function ParkingService () {	
}

ParkingService.prototype.getParkingStats = getParkingStats;

module.exports = ParkingService;
