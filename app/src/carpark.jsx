var React = require('react');

var CarPark = React.createClass(
  {
    render: function(){
      var lat = this.props.details.location.lat;
      var lon = this.props.details.location.lon;
      var backUrl = 'https://maps.googleapis.com/maps/api/streetview?size=480x160&location=' + lat + ',' + lon + '&key=AIzaSyAckgB0_dFK2D1ERLQC2LVC0jpwsM5gjDY';
      var backgroundStyle = {
        color: '#fff',
        height: '160px',
        background: 'url(' + backUrl + ') center / cover'
      };
      
      return(
				<div>
					<div className="carpark-card-wide mdl-card mdl-shadow--2dp">
					  <div style={backgroundStyle} className="mdl-card__title">
					    <h1 className="mdl-card__title-text">{this.props.details.name}</h1>
					  </div>
					  <div className="mdl-card__supporting-text">
					    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
					    Mauris sagittis pellentesque lacus eleifend lacinia...
					  </div>
					  <div className="mdl-card__actions mdl-card--border">
					    <a className="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">
					      Rating
					    </a>
							<a className="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">
								Take me there
							</a>
							<a className="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">
								Spaces
							</a>
							<a className="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">
								UBER
							</a>
					  </div>
					  <div className="mdl-card__menu">
					    <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
					      <i className="material-icons">menu</i>
					    </button>
					  </div>
					</div>
					<br />
				</div>
      )
    }
  }
);

export default CarPark;
