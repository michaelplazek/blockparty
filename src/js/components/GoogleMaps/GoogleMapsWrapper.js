import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class GoogleMapsWrapper extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
		<GoogleMap
			defaultZoom={8}
			defaultCenter={{ lat: -34.397, lng: 150.644 }}
		>
			{ <Marker position={{ lat: -34.397, lng: 150.644 }} />}
		</GoogleMap>
		)
	}
}

export default compose(
	withProps(props => {
		return {
			googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBnLziZFF5VLvovFkHPEulNisGPllCJitE&v=3.exp&libraries=geometry,drawing,places`,
			loadingElement: <div style={{ height: `100%` }} />,
			containerElement: <div style={{ height: props.height, width: '100%' }} />,
			mapElement: <div style={{ height: props.height, width: '100%'}} />
		}
	}),
	withScriptjs,
	withGoogleMap
)(GoogleMapsWrapper);

