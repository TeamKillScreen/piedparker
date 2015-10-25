/* jshint -W097 */
"use strict";

/* global module */
/* global process */
/* global require */

var _ = require("lodash");
var eyes = require("eyes");
var Promise = require("Promise");
var request = require("request");
var parseString = require('xml2js').parseString;
var Firebase = require("Firebase");
var md5 = require("md5");

function getClosestParkMarkCarPark(location)
{
	return new Promise(function(resolve, reject){
		getParkMarkCarParks(location)
			.then(function (data) {
				if (data)
				{
					var minDistance = 1000;
					var closestCarpark = null;

					_.each(data.markers.marker, function(item) {
						if(item.$.distance < minDistance)
						{
							minDistance = item.$.distance;
							closestCarpark = item.$;
						}
					});

					resolve(closestCarpark);
				}
				else
				{
					reject("No data");
				}
			})
			.catch(function (error) {
				reject(error);
			});
	});
}

function getParkMarkCarParks(location)
{
	return new Promise(function (resolve, reject) {

		var firebaseCache = new Firebase("https://piedparker.firebaseio.com/parkmarkcache");

		var hash = md5(location.lat + ":" + location.lon);

		firebaseCache.once("value",function(dataSnapshot) {
			if(dataSnapshot.hasChild(hash))
			{
				var body = dataSnapshot.child(hash).val();

				parseString(body, function (err, result) {
		              resolve(result);
		    });
			}
			else
			{
				var jar = request.jar();

			  var options = {	uri: 'http://www.parkmark.co.uk/car-park-finder',
						            jar: jar, 
						            method: "GET"
						          };

				request(options, function (error, response, body) {
		    	if (!error && response.statusCode == 200) {
		    		var innerOptions = {  uri: 'http://www.parkmark.co.uk/storesLocatorHandler.ashx?latitude=' + location.lat + '&longitude=' + location.lon,
								                  jar: jar,
								                  method: "GET",
								                  headers: {"Referer": "http://www.parkmark.co.uk/car-park-finder"}
								                };
						request(innerOptions, function (error, response, body) {
							if (!error && response.statusCode == 200)
		          {

		          	dataSnapshot.child(hash).ref().set(body);

		          	parseString(body, function (err, result) {
		              resolve(result);
		            });
		          }
		          else
		          {
		          	reject(error);
		          }
						});
		    	}
		    	else
		    	{
		    		reject(error);
		    	}
		    });
			}
		});		
	});
}

function setParkMark (carPark) {
	return new Promise(function (resolve, reject) {
		getClosestParkMarkCarPark(carPark.location).then(function(data){
			carPark.hasParkMark = (data.Spaces == carPark.capacity);

			resolve(carPark);
		}).catch(function (error) {
			reject(error);
		});
	});
}

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

function setParkMarks (carParks) {
	var promises = [];

	_.each(carParks, function (carPark) {
		promises.push(setParkMark(carPark));
	});

	return Promise.all(promises);
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

			var carParks = _.map(json, mapper);

			resolve(carParks);
		};
		
		request(options, callback);		
	});
}

function ParkingService () {	
}

ParkingService.prototype.getParkingStats = getParkingStats;
ParkingService.prototype.getParkMarkCarParks = getParkMarkCarParks;
ParkingService.prototype.getClosestParkMarkCarPark = getClosestParkMarkCarPark;
ParkingService.prototype.setParkMarks = setParkMarks;

module.exports = ParkingService;
