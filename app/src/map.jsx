var React = require('react');
import { GoogleMap, Marker, SearchBox } from "react-google-maps";

var SimpleMap = React.createClass(
  {
    render: function(){
      return(
				<GoogleMap containerProps={{
						style: {
							height: "100%",
							width: "100%"
						},
					}}
					defaultZoom={12}
					defaultCenter={{lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lon)}}
					//onClick={props.onMapClick}
					></GoogleMap>
			)
	}
});

var Map = React.createClass(
  {
    render: function(){
      return(
				<div>
					<div className="carparkmap-card-wide mdl-card mdl-shadow--2dp">
					  <div className="mdl-card__title">
					    <h1 className="mdl-card__title-text">Car Park Map</h1>
					  </div>
					  <div className="google-map-card mdl-card__supporting-text">
					    <SimpleMap lon={this.props.lon} lat={this.props.lat} />
					  </div>
					</div>
					<br />
				</div>
      )
    }
  }
);

export default Map;