var React = require('react');
var ReactDOM = require('react-dom')
var CarPark = require('./carpark.jsx')

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
		var component = this;
		if (component.state.mode == 'test') {
			var firebaseRef = new Firebase('https://piedparker.firebaseio.com/test' + "/parking");
				component.bindAsArray(firebaseRef.limitToLast(25), 'parking');
				component.setState({fireBaseUrl: 'https://piedparker.firebaseio.com/test'});
		}
		else {
			$.get("https://piedparker2015.azurewebsites.net/api/parking/?lat=" + component.state.lat + "&lon=" + component.state.lon, function(data) {
				var firebaseRef = new Firebase(data.url + "/parking");
				component.bindAsArray(firebaseRef.limitToLast(25), 'parking');
				component.setState({fireBaseUrl: data.url});
			});
		}
	},
	render: function() {
		var carparks = this.state.parking.map(function(carpark, index) {
			return (
				<CarPark key={index} details={carpark} />
			)
		});
		return (
			<div>
				{carparks}
			</div>
		);
	}
});

ReactDOM.render(
	React.createElement(Main, null),
	document.getElementById('Main')
);
