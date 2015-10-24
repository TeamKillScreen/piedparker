var CarPark = React.createClass({displayName: 'CarPark',
	render: function() {
		return (
			<h1>Hello world?!</h1>
			);
	}
});

ReactDOM.render(
	React.createElement(CarPark, null),
	document.getElementById('Main')
	);