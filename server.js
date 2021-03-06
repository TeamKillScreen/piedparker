/* global process */

// node_modules
var cors = require("cors");
var express = require("express");
var eyes = require("eyes");
var Firebase = require("firebase");
var md5 = require("md5");
var port = process.env.PORT || 1337;

// backend modules
var PushoverService = require("./backend/PushoverService");
var GeoCodeService = require("./backend/GeoCodeService");

// server starts here
var app = express();

app.use(express.static("app"));
app.use(cors());

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.get("/api/launch/", function (req, res) {
  var lat = req.query.lat;
  var lon = req.query.lon;
  
  var pushoverService = new PushoverService();
  
  pushoverService.sendMessage({
    location: {
      lat: lat,
      lon: lon
    }
  })
  .then(function (response) {
    res.json(response);
  })
  .catch(function (error) {
    res.json({
      error: error
    });
  });
});

app.get("/api/parking/", function (req, res) {
  var lat = req.query.lat;
  var lon = req.query.lon;

  var splitLat = lat.split(".");
  var splitLon = lon.split(".");

  var maxDecimalPoints = 4

  lat = splitLat[0] + "." + splitLat[1].substring(0, splitLat[1].length < maxDecimalPoints ? splitLat[1].length : maxDecimalPoints);
  lon = splitLon[0] + "." + splitLon[1].substring(0, splitLon[1].length < maxDecimalPoints ? splitLon[1].length : maxDecimalPoints);
  
  var hash = md5(lat + ":" + lon);

  var firebaseLocationUrl = "https://piedparker.firebaseio.com/locations/" + hash;
  var firebase = new Firebase(firebaseLocationUrl);


  firebase.once('value', function(dataSnapshot) {
    if (!dataSnapshot.hasChild("location"))
    {
      var geoCodeService = new GeoCodeService();

      var location = { 
          lat: lat,
          lon: lon
      };

      geoCodeService.getAddress(location).then(function (address) {
        location.address = address;
        
        firebase.child("location").set(location);
      })
      .catch(function (error) {
        console.dir(error);
      });

    }

  });

  
  res.json({
    "url": firebaseLocationUrl
  });
});

var server = app.listen(port, function () {
  console.log("Serving on port %d", port);
});
