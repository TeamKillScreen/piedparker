/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var React = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../build/react\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var CarPark = React.createClass({
		displayName: "CarPark",

		render: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "carpark-card-wide mdl-card mdl-shadow--2dp" },
					React.createElement(
						"div",
						{ className: "mdl-card__title" },
						React.createElement(
							"h1",
							{ className: "mdl-card__title-text" },
							this.props.details.name
						)
					),
					React.createElement(
						"div",
						{ className: "mdl-card__supporting-text" },
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis pellentesque lacus eleifend lacinia..."
					),
					React.createElement(
						"div",
						{ className: "mdl-card__actions mdl-card--border" },
						React.createElement(
							"a",
							{ className: "mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" },
							"Get Started"
						)
					),
					React.createElement(
						"div",
						{ className: "mdl-card__menu" },
						React.createElement(
							"button",
							{ className: "mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" },
							React.createElement(
								"i",
								{ className: "material-icons" },
								"menu"
							)
						)
					)
				),
				React.createElement("br", null)
			);
		}
	});

	var Main = React.createClass({ displayName: 'test',
		mixins: [ReactFireMixin],
		getInitialState: function getInitialState() {
			return {
				test: []
			};
		},
		componentWillMount: function componentWillMount() {
			var firebaseRef = new Firebase('https://piedparker.firebaseio.com/test/');
			this.bindAsArray(firebaseRef.limitToLast(25), 'test');
		},
		render: function render() {
			var carparks = this.state.test.map(function (carpark, index) {
				return React.createElement(CarPark, { key: index, details: carpark });
			});
			return React.createElement(
				"div",
				null,
				carparks
			);
		}
	});

	ReactDOM.render(React.createElement(Main, null), document.getElementById('Main'));

/***/ }
/******/ ]);