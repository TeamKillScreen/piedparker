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

function updateParking(location, snapshot)
{
  parkingService.getParkingStats(location)
    .then(function (data) {
      if (data.length) {
        //eyes.inspect(data);
        
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

function updateCrimeData(location, snapshot)
{
  policeService.getAllCrimeStatsAndAnalysis(location)
      .then(function (data) {
        if (data) {
          //eyes.inspect(data);
          
          snapshot.ref().child("crime").set(data, function (error) {
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
  
    updateCrimeData(location, snapshot);
  
    updateParking(location, snapshot);
  }

  setLocationStats();  
  
});

setInterval(function (){
  console.log("Updating Parking Data")
  rootRef.once("value",function(dataSnapshot) {
    dataSnapshot.forEach(function(childSnapshot) {
      var locationVal = childSnapshot.val();

      var location = locationVal.location;

      updateParking(location, childSnapshot);
    });
  });
}, 5000);
