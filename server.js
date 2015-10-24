/* global process */
var express = require("express");
var md5 = require("md5")
var app = express();
var port = process.env.PORT || 1337;

app.use(express.static("app"));

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

app.get("/api/parking/crime", function (req, res) {
  var lat = req.query.lat;
  var lon = req.query.lon;

  var firebaseurl = "https://piedparker.firebaseio.com/parking/crime/" + md5(lat + ":" + lon)

  res.json({"url":firebaseurl})
});

var server = app.listen(port, function () {
  console.log("Serving on port %d", port);
});
