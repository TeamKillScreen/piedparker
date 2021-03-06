var React = require('react');
var _ = require('lodash');

var Risk = React.createClass(
	{
		render: function() {
			var classes = "mdl-button mdl-js-button mdl-button--fab mdl-button--colored " + "risk-" + this.props.details.risk; 
			return(
				<div className="mdl-cell mdl-cell--4-col">
					<button className={classes}>
						{this.props.details.numberOfCrimes}
					</button>
					<p>{this.props.name}</p>
				</div>
			);
		}	
	}
);

var Crime = React.createClass(
  {
    render: function(){
		var lat = this.props.lat;
		var lon = this.props.lon;
		var backUrl = 'https://maps.googleapis.com/maps/api/streetview?size=480x160&location=' + lat + ',' + lon + '&key=AIzaSyAckgB0_dFK2D1ERLQC2LVC0jpwsM5gjDY';
		var backgroundStyle = {
			color: '#fff',
			height: '160px',
			background: 'url(' + backUrl + ') center / cover'
		};
	
		var locationAddress = _.first(_.where(this.props.location, { ".key": "address"}));
		var address = "";
		if (locationAddress !== undefined) {
			var address = locationAddress.formattedAddress;
		}
		
		var content;
		var risk = _.first(_.where(this.props.details, { ".key": "risk"}));
		if (risk !== undefined) {		
			content = (
					<div className="mdl-card__supporting-text risks">
						<div className="mdl-grid">
							<Risk details={risk.currentMonth} name="Recent"/>
							<Risk details={risk.highestMonth} name="Highest"/>
							<Risk details={risk.futureForecast} name="Predicted"/>
						</div>
					</div>
				);
		}
		else {
			content = (
						<div className="mdl-card__supporting-text">
							<div className="mdl-grid">
								<div className="mdl-spinner mdl-js-spinner is-active"></div>
							</div>
						</div>
					);
		}
		
		var crimeTitle = "Bicycle Thefts Nearby";
		if (this.props.crimeType == "crime") {
			crimeTitle = "Vehicle Crime Nearby";
		}
		
      return(
	  	
				<div>
					<div className="crime-card-wide mdl-card mdl-shadow--2dp">
					  <div className="mdl-card__title">
					    <h1 className="mdl-card__title-text">{crimeTitle}</h1>
					  </div>
					  <div>
					<div style={backgroundStyle} className="mdl-card__title">
					</div>
						<div className="mdl-card__supporting-text">
							<h1 className="mdl-card__title-text">{address}</h1>
						</div>
					</div>
					  {content}
					</div>
					<br />
				</div>
      )
    }
  }
);

export default Crime;