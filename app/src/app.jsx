var CarPark = React.createClass(
  {
    render: function(){
      return(
				<div>
					<div className="demo-card-wide mdl-card mdl-shadow--2dp">
					  <div className="mdl-card__title">
					    <h2 className="mdl-card__title-text">{this.props.details.name}</h2>
					  </div>
					  <div className="mdl-card__supporting-text">
					    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					    Mauris sagittis pellentesque lacus eleifend lacinia...
					  </div>
					  <div className="mdl-card__actions mdl-card--border">
					    <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
					      Get Started
					    </a>
					  </div>
					  <div className="mdl-card__menu">
					    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
					      <i className="material-icons">share</i>
					    </button>
					  </div>
					</div>
					<br />
				</div>
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
				{carparks}
			</div>
		);
	}
});

ReactDOM.render(
	React.createElement(Main, null),
	document.getElementById('Main')
);
