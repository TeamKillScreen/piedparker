var CarPark = React.createClass(
  {
    render: function(){
      return(
        <h1>
          {this.props.details.name}
        </h1>
      )
    }
  }
);

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

				<h1>
					Hello world?!
				</h1>
				{carparks}
			</div>
		);
	}
});

ReactDOM.render(
	React.createElement(Main, null),
	document.getElementById('Main')
);
