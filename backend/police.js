var Firebase = require("firebase");
var eyes = require("eyes")
var request = require('request');

function GetCrimeStats(lat, lon, monthKey, firebaseURL)
{ 
  request({uri: 'https://data.police.uk/api/crimes-street/all-crime?lat='+lat+'&lng='+lon+'&date='+monthKey, method: "GET"},
            function (error, response, body) {
              if (!error && response.statusCode == 200) {
                var outputFirebase = new Firebase(firebaseURL + monthKey);

                outputFirebase.set(JSON.parse(body));
            }});
}


var firebaseURL = "https://piedparker.firebaseio.com/locations/"

var locationsFirebase = new Firebase(firebaseURL);

locationsFirebase.on('child_added', function(childSnapshot, prevChildKey){
  var child = childSnapshot.val();

  var location = child.location;

  var lat = location.lat;
  var lon = location.lon;


  var dataMonths = ["2015-08", "2015-07", "2015-06", "2015-05", "2015-04", "2015-03"];

  var rawOutputURL = firebaseURL + childSnapshot.key() + "/crimes/raw/"

  for (var i = 0, len = dataMonths.length; i < len; i++) 
  {
    GetCrimeStats(lat,lon,dataMonths[i], rawOutputURL);
  }
})