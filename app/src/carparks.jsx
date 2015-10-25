var React = require('react');
var CarPark = require('./carpark.jsx')

var CarParks = React.createClass(
  {
    render: function(){
      var component = this;
		var carparks = this.props.details.map(function(carpark, index) {
			return (
				<CarPark key={index} details={carpark} lon={component.props.lon} lat={component.props.lat} />
			)
		});

		var loader = (<div></div>);
		if (this.props.total == 0) {
			loader = (
				<div className="carparks-loader">
					<div className="carparks-loader-wide mdl-card mdl-shadow--2dp">
						<div className="mdl-card__title">
							<h1 className="mdl-card__title-text">Car Parks</h1>
						</div>
						<div className="mdl-card__supporting-text">
							<div className="mdl-grid">
								<div className="mdl-spinner mdl-js-spinner is-active"></div>
							</div>
						</div>
					</div>
					<br />
				</div>
			)};
      return(
				<div>
					{loader}
					{carparks}
				</div>
      )
    }
  }
);

export default CarParks;
