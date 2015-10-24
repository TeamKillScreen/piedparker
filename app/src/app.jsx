var CarPark = React.createClass({displayName: 'test',
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
                        <h1 key={index}>{carpark.name}</h1>
                        )
                });
		return (
                        <div>
			     <h1>Hello world?!</h1>
                             {carparks}
                        </div>
		);
	}
});

ReactDOM.render(
	React.createElement(CarPark, null),
	document.getElementById('Main')
	);