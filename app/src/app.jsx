var React = require('react');
var ReactDOM = require('react-dom')
var CarParks = require('./carparks.jsx')
var Crime = require('./crime.jsx')
var Choice = require('./choice.jsx')
var Map = require('./map.jsx')

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var Main = React.createClass({displayName: 'Main',
	mixins: [ReactFireMixin],
	getInitialState: function() {
		var lon = getParameterByName('lon');
		var lat = getParameterByName('lat');
		var mode = getParameterByName('mode');
		
		return {
			parking: [],
			lon: lon,
			lat: lat,
			mode: mode
		};
	},
	componentWillMount: function() {
		this.fireBaseBindings();
	},
	fireBaseBindings: function() {
		var component = this;
		
		var binding = function(url) {
				var firebaseParkingRef = new Firebase(url + "/parking");
				component.bindAsArray(firebaseParkingRef.limitToLast(25), 'parking');
				
				var firebaseCrimeRef = new Firebase(url + "/crime");
				component.bindAsArray(firebaseCrimeRef.limitToLast(25), 'crime');
				
				var firebaseLocationRef = new Firebase(url + "/location");
				component.bindAsArray(firebaseLocationRef.limitToLast(25), 'location');
				
				component.setState({fireBaseUrl: url});
			};
		
		if (component.state.mode == 'test') {
			binding('https://piedparker.firebaseio.com/test');
		}
		else {
			$.get("https://piedparker2015.azurewebsites.net/api/parking/?lat=" + component.state.lat + "&lon=" + component.state.lon, function(data) {
				binding(data.url);
			});
		}
	},
	parkCar: function(loginToAdd) {
    	//this.setState({logins: this.state.logins.concat(loginToAdd)});
  	},
	parkBike: function(loginToAdd) {
    	//this.setState({logins: this.state.logins.concat(loginToAdd)});
  	},
	render: function() {
		return (
			<div>
				<Choice parkCar={this.parkCar} parkBike={this.parkBike} />
				<Crime details={this.state.crime} lon={this.state.lon} lat={this.state.lat} location={this.state.location} />
				<Map details={this.state.parking} lon={this.state.lon} lat={this.state.lat} />
				<CarParks details={this.state.parking} total={this.state.parking.length} />
			</div>
		);
	}
});

ReactDOM.render(
	React.createElement(Main, null),
	document.getElementById('Main')
);
