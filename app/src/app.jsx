var React = require('react');
var ReactDOM = require('react-dom')
var CarPark = require('./carpark.jsx')

var Main = React.createClass({displayName: 'test',
	mixins: [ReactFireMixin],
	getInitialState: function() {
		return {
			test: []
		};
	},
	componentWillMount: function() {
		var firebaseRef = new Firebase('https://piedparker.firebaseio.com/test/');
		this.bindAsArray(firebaseRef.limitToLast(25), 'test');
	},
	render: function() {
		var carparks = this.state.test.map(function(carpark, index) {
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
