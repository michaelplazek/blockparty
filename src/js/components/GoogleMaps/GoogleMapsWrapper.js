import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class GoogleMapsWrapper extends Component{
	constructor(props){
		super(props);

		this.state = {
			zoom: 8,
			currentLocation: {
				lat: 40.564714,
				lng: -105.090650
			}
		};
	}

	componentDidMount() {
		if (this.props.centerAroundCurrentLocation) {
			if (navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos) => {
					const coords = pos.coords;
					this.setState({
						currentLocation: {
							lat: coords.latitude,
							lng: coords.longitude
						}
					})
				})
			}
		}
	}

	render(){
		return (
		<GoogleMap
			defaultZoom={this.state.zoom}
			defaultCenter={{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }}
		>
			{ <Marker position={{ lat: 40.564714, lng: -105.090650 }} />}
		</GoogleMap>
		)
	}
}

GoogleMapsWrapper.propTypes = {
	centerAroundCurrentLocation: PropTypes.bool,
	zoom: PropTypes.number,
	initialCenter: PropTypes.object,
};

GoogleMapsWrapper.defaultProps = {
	zoom: 13,
	initialCenter: {
		lat: 40.564714,
		lng: -105.090650
	},
	centerAroundCurrentLocation: true,
};

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

