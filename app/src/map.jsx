var React = require('react');

var Map = React.createClass(
  {
    render: function(){
      return(
				<div>
					<div className="carparkmap-card-wide mdl-card mdl-shadow--2dp">
					  <div className="mdl-card__title">
					    <h1 className="mdl-card__title-text">Car Park Map</h1>
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

export default Map;