/* jshint -W097 */
"use strict";

/* global module */
/* global process */
/* global require */

// node_modules
var eyes = require("eyes");
var Promise = require("promise");
var request = require("request");
var util = require("util");

function sendMessage (payload) {
  return new Promise(function (resolve, reject) {
    var urlFormat = "https://piedparker2015.azurewebsites.net/index.html?lat=%d&lon=%d&mode=test";
    var url = util.format(urlFormat, payload.location.lat, payload.location.lon);

    var headers = {
        "content-type": "application/x-www-form-urlencoded"
    };

    var options = {
        url: "https://api.pushover.net/1/messages.json",
        method: "POST",
        headers: headers,
        form: {
          title: "Pied Parker",
          token: process.env.PUSHOVER_APPKEY,
          user: process.env.PUSHOVER_USERKEY,
          message: "Check your parking spot.",
          url: url,
          url_title: "Launch the Pied Parker app",
          priority: 1,
          sound: "siren"
      }
    };

    eyes.inspect(options);    

    request(options, function (error, response, body) {
      if (error) {
        reject(error);
        return;
      }

      if (response.statusCode !== 200) {
        reject(response.statusCode);
        return;
      }

      resolve({
        status: "OK"
      });
    });
  });
}

function PushoverService () {	
}

PushoverService.prototype.sendMessage = sendMessage;

module.exports = PushoverService;
