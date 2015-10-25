var React = require('react');

var Choice = React.createClass(
  {
    render: function(){
      return(
				<div>
					<div className="choice-card mdl-card mdl-shadow--2dp">
					  <div className="mdl-card__supporting-text">
					    <button title="Park your car" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect park-your-car mdl-button--colored" disabled>
							<i className="material-icons">directions_car</i>
						</button>
						<button title="Park your bike" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect park-your-bike mdl-button--colored">
							<i className="material-icons">directions_bike</i>
						</button>
					  </div>
					</div>
					<br />
				</div>
      )
    }
  }
);

export default Choice;