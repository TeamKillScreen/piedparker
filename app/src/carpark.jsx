var React = require('react');

var CarPark = React.createClass(
  {
    getDirectionsUrl: function(lat, lon){
      var currentLat; var currentLon;

      var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
      var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

      if (isSafari) {
        return 'http://maps.apple.com/?daddr=' + lat + ',' + lon + '&dirflg=d';
      }
      else {
        return 'http://maps.google.com/?saddr=' + this.props.lat + ',' + this.props.lon + '&daddr=' + lat + ',' + lon + '&directionsmode=driving';
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

      var hasParkMark = this.props.details.hasParkMark !== undefined ? this.props.details.hasParkMark : false;
      var riskCss = hasParkMark ? 'rgb(76,175,80)' : 'rgb(255,152,0)';
      var riskIcon = hasParkMark ? 'verified_user' : 'warning';

      var parkMarkStyle = {
        float: 'right',
        background: riskCss
      };

      var numberOfSpaces = this.props.details.spaces > 0 ? this.props.details.spaces + ' ' : 'No '
      var spacesText = this.props.details.state === 'Spaces' ? numberOfSpaces + 'spaces' : 'Closed';

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
                <h1 className="mdl-card__title-text">{spacesText}</h1>
              </div>
					  </div>
					  <div className="mdl-card__actions mdl-card--border">
              <a id="dirs" href={this.getDirectionsUrl(lat, lon)} target="_blank" title="Directions to this location" className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect">
								<i className="material-icons">directions</i>
							</a>
              <a id="uber" title={hasParkMark ? "Park mark approved" : "Use with caution"} style={parkMarkStyle} className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-js-ripple-effect">
								<i className="material-icons">{riskIcon}</i>
							</a>
					  </div>
					</div>
					<br />
				</div>
      )
    }
  }
);

export default CarPark;
