var React = require('react');
var CarPark = require('./carpark.jsx')

var CarParks = React.createClass(
  {
    render: function(){
		var carparks = this.props.details.map(function(carpark, index) {
			return (
				<CarPark key={index} details={carpark} />
			)
		});
      return(
				<div>
					{carparks}
				</div>
      )
    }
  }
);

export default CarParks;