/* jshint -W097 */
"use strict";

/* global exports */
/* global require */

// NPM modules.
var request = require("request");
var Promise = require("Promise");

function httpGet(url) {
	return new Promise(function (resolve, reject) {
		request(url, function (error, response, data) {
			if (error) {
				reject(error);
				return;
			}

			if (response.statusCode !== 200) {
				reject(response.statusCode);
			}

			resolve(data);
		});
	});
}

exports.httpGet = httpGet;
