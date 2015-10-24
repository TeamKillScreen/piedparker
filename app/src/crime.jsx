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
					<div className="clear-fix"></div>
				</div>
			);
		}	
	}
);

var Crime = React.createClass(
  {
    render: function(){
		var content;
		var risk = _.first(_.where(this.props.details, { ".key": "risk"}));
		if (risk !== undefined) {
			content = (
					<div className="mdl-card__supporting-text">
						<div className="mdl-grid">
							<Risk details={risk.currentMonth} name="Current"/>
							<Risk details={risk.highestMonth} name="Worst"/>
							<Risk details={risk.futureForecast} name="Forcast"/>
						</div>
						<div className="mdl-grid">
							<div className="mdl-cell mdl-cell--4-col">
								<span>Current</span>
							</div>
							<div className="mdl-cell mdl-cell--4-col">
								<span>Worst</span>
							</div>
							<div className="mdl-cell mdl-cell--4-col">
								<span>Forcast</span>
							</div>
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
      return(
	  	
				<div>
					<div className="crime-card-wide mdl-card mdl-shadow--2dp">
					  <div className="mdl-card__title">
					    <h1 className="mdl-card__title-text">Crime Stats</h1>
					  </div>
					  {content}
					  <div className="mdl-card__actions mdl-card--border">
					    <a className="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">
					      Rating
					    </a>
							<a className="mdl-button mdl-js-button mdl-button--colored mdl-js-ripple-effect">
								A button
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

export default Crime;