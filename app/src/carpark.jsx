var React = require('react');

var CarPark = React.createClass(
  {
    getDirectionsUrl: function(lat, lon){
      var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

      if (isSafari) {
        return 'http://maps.apple.com/?daddr=' + lat + ',' + lon + '&dirflg=d';
      }
      else {
        return 'http://maps.google.com/?daddr=' + lat + ',' + lon + '&directionsmode=driving';
      };
    },
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
					  </div>
					  <div className="mdl-card__supporting-text">
					    <div className="carpark-title">
                <h1 className="mdl-card__title-text">{this.props.details.name}</h1>
              </div>
              <div className="carpark-spaces">
                <h1 className="mdl-card__title-text">Spaces:{this.props.details.spaces}</h1>
              </div>
					  </div>
					  <div className="mdl-card__actions mdl-card--border">
					    <a className="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">
					      Rating
					    </a>
							<a href={this.getDirectionsUrl(lat, lon)} target="_blank" className="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">
								Directions
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
