/* global process */
var express = require("express");
var md5 = require("md5")
var app = express();
var Firebase = require("firebase");
var port = process.env.PORT || 1337;

app.use(express.static("app"));

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.get("/api/parking/", function (req, res) {
  var lat = req.query.lat;
  var lon = req.query.lon;

  var firebaseurl = "https://piedparker.firebaseio.com/locations/" + md5(lat + ":" + lon);

  var initFirebase = new Firebase(firebaseurl);

  initFirebase.set({"crime":{},"parking":{},
    "location":{"lat":lat, "lon":lon}
  }
  }});

  res.json({"url":firebaseurl})
});

var server = app.listen(port, function () {
  console.log("Serving on port %d", port);
});
