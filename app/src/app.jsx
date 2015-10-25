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
			mode: mode,
			crimeType: "crime"
		};
	},
	componentWillMount: function() {
		var component = this;
		var lon = this.state.lon;
		var lat = this.state.lat;

		if (lon == "" || lat == "") {
			navigator.geolocation.getCurrentPosition(function(position) {
				lat = position.coords.latitude;
				lon = position.coords.longitude;
				component.setState({ lon: lon, lat: lat});
				component.fireBaseBindings(component.state.crimeType);
			});
		}
		else {
			this.fireBaseBindings(this.state.crimeType);
		}
	},
	fireBaseBindings: function(crime) {
		try
		{
			this.unbind("parking");
			this.unbind("crime");
			this.unbind("location");
		} catch (e) {
		}

		var component = this;

		var binding = function(url) {
				var firebaseParkingRef = new Firebase(url + "/parking");
				component.bindAsArray(firebaseParkingRef.limitToLast(25), 'parking');

				var firebaseCrimeRef = new Firebase(url + "/" + crime);
				component.bindAsArray(firebaseCrimeRef.limitToLast(25), 'crime');

				var firebaseLocationRef = new Firebase(url + "/location");
				component.bindAsArray(firebaseLocationRef.limitToLast(25), 'location');

				component.setState({fireBaseUrl: url, crimeType: crime});
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
    	this.fireBaseBindings("crime");
  	},
	parkBike: function(loginToAdd) {
    	this.fireBaseBindings("theft");
  	},
	render: function() {
		var parking = (<div></div>);
		if (this.state.crimeType == "crime")
		{
			parking = (
				<div>
					<Map details={this.state.parking} lon={this.state.lon} lat={this.state.lat} />
					<CarParks details={this.state.parking} total={this.state.parking.length} lon={this.state.lon} lat={this.state.lat} />
				</div>
			);
		}
		return (
			<div>
				<Choice parkCar={this.parkCar} parkBike={this.parkBike} />
				<Crime details={this.state.crime} lon={this.state.lon} lat={this.state.lat} location={this.state.location} crimeType={this.state.crimeType} />
				{parking}
			</div>
		);
	}
});

ReactDOM.render(
	React.createElement(Main, null),
	document.getElementById('Main')
);
