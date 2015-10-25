var React = require('react');
import { GoogleMap, Marker, SearchBox } from "react-google-maps";

var SimpleMap = React.createClass(
  {
    render: function(){
      return(
	  			// https://github.com/tomchentw/react-google-maps
				// http://tomchentw.github.io/react-google-maps/
				<GoogleMap containerProps={{
						style: {
							height: "100%",
							width: "100%"
						},
					}}
					defaultZoom={15}
					defaultCenter={{lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lon)}}
					>
						{this.props.markers.map((marker, index) => {
							return (
								<Marker
								{...marker} />
							);
						})}
					</GoogleMap>
			)
	}
});

var Map = React.createClass(
  {
    render: function(){
		var markers = this.props.details.map(function(carpark, index) {
			return {
				position: {
					lat: carpark.location.lat,
					lng: carpark.location.lon,
				},
      			key: index,
      			defaultAnimation: 2
			}
		});
		
		markers.push(
			{
				position: {
					lat: this.props.lat,
					lng: this.props.lon,
				},
      			key: "youarehere",
      			defaultAnimation: 1
			}
		);
		
		var content;
		
		if (this.props.lon == "" || this.props.lat == "") {
			content = (<div className="mdl-grid">
							<div className="mdl-spinner mdl-js-spinner is-active"></div>
						</div>);
		}
		else
		{
			content = (<SimpleMap lon={this.props.lon} lat={this.props.lat} markers={markers} />);
		}
		
      return(
				<div>
					<div className="carparkmap-card-wide mdl-card mdl-shadow--2dp">
					  <div className="mdl-card__title">
					    <h1 className="mdl-card__title-text">Car Park Map</h1>
					  </div>
					  <div className="google-map-card mdl-card__supporting-text">
					    {content}
					  </div>
					</div>
					<br />
				</div>
      )
    }
  }
);

export default Map;