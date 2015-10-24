/* global process */
var express = require("express");
var cors = require("cors");
var md5 = require("md5");
var app = express();
var Firebase = require("firebase");
var port = process.env.PORT || 1337;

app.use(express.static("app"));
app.use(cors());

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.get("/api/parking/", function (req, res) {
  var lat = req.query.lat;
  var lon = req.query.lon;
  var hash = md5(lat + ":" + lon);

  var firebaseLocationUrl = "https://piedparker.firebaseio.com/locations/" + hash;
  var firebase = new Firebase(firebaseLocationUrl);


  firebase.once('value', function(dataSnapshot) {
    if(!dataSnapshot.hasChild("location"))
    {
      firebase.set({ 
        "location": {
          "lat": lat,
          "lon": lon
        }
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
