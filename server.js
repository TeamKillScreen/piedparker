/* global process */
var express = require("express");
var app = express();
var port = process.env.PORT || 1337;

app.use(express.static("app"));

app.get("/", function (req, res) {
  res.redirect("/index.html");
});

var server = app.listen(port, function () {
  console.log("Serving on port %d", port);
});
