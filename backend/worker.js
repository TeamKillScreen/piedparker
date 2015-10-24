/* jshint -W097 */
"use strict";

/* global require */
/* global console */

var eyes = require("eyes");
var Firebase = require("Firebase");

var ParkingService = require("./ParkingService");
var PoliceService = require("./PoliceService");

var firebaseUrl = "https://piedparker.firebaseio.com/locations/";
var rootRef = new Firebase(firebaseUrl);

var parkingService = new ParkingService();
var policeService = new PoliceService();

  
rootRef.on("child_added", function (snapshot) {
  function setLocationStats () {
    var locationVal = snapshot.val();
    var locationRef = snapshot.ref(); 
    var location = locationVal.location;
  
    policeService.getAllCrimeStats(location)
      .then(function (data) {
        if (data.length) {
          eyes.inspect(data);
          
          locationRef.child("crime").set(data, function (error) {
            if (error) {
              eyes.inspect(error);          
            }
          });
        }
      })
      .catch(function (error) {
        console.dir(error);
      });
  
    parkingService.getParkingStats(location)
      .then(function (data) {
        if (data.length) {
          eyes.inspect(data);
          
          snapshot.ref().child("parking").set(data, function (error) {
            if (error) {
              eyes.inspect(error);          
            }
          });
        }
      })
      .catch(function (error) {
        console.dir(error);
      });  
  }

  setLocationStats();  
  // setInterval(setLocationStats, 15 * 1000);
});
