/* jshint -W097 */
"use strict";

/* global require */
require('log-timestamp');

/* global console */

var eyes = require("eyes");
var Firebase = require("firebase");

var ParkingService = require("./parkingService");
var PoliceService = require("./policeService");

var firebaseUrl = "https://piedparker.firebaseio.com/locations/";
var rootRef = new Firebase(firebaseUrl);

var parkingService = new ParkingService();
var policeService = new PoliceService();

console.log("Worker starting");

function updateParking(location, snapshot)
{
  console.log("Updating Parking for " + snapshot.key() + ". {lat: " + location.lat + ", lon: " + location.lon + "}");

  parkingService.getParkingStats(location)
    .then(function (data) {
      if (data.length) {
        //eyes.inspect(data);

        parkingService.setParkMarks(data)
          .then(function (data) {
            snapshot.ref().child("parking").set(data, function (error) {
              if (error) {
                eyes.inspect(error);          
              }
            });     
          })
          .catch(function (error) {
            console.dir(error);
          });
        
        
      }
    })
    .catch(function (error) {
      console.dir(error);
    });
}

function updateCrimeData(location, snapshot, category)
{
  console.log("Updating " + category + " for " + snapshot.key() + ". {lat: " + location.lat + ", lon: " + location.lon + "}");

  policeService.getAllCrimeStatsAndAnalysis(location, 500, category)
      .then(function (data) {
        if (data) {
          //eyes.inspect(data);
          
          snapshot.ref().child(category.split("-")[1]).set(data, function (error) {
            if (error) {
              eyes.inspect(error);
            }
          });
        } else {
          console.log("No data");
        }
      })
      .catch(function (error) {
        console.dir(error);
      });
}

  
rootRef.on("child_added", function (snapshot) {
  function setLocationStats () {
    var locationVal = snapshot.val();
    var locationRef = snapshot.ref(); 
    var location = locationVal.location;
  
    updateCrimeData(location, snapshot, "vehicle-crime");

    updateCrimeData(location, snapshot, "bicycle-theft");
  
    updateParking(location, snapshot);
  }

  setLocationStats();  
  
});

setInterval(function (){
  console.log("Scheduled Parking Data Update");
  rootRef.once("value",function(dataSnapshot) {
    dataSnapshot.forEach(function(childSnapshot) {
      var locationVal = childSnapshot.val();

      var location = locationVal.location;

      updateParking(location, childSnapshot);
    });
  });
}, 30000);
