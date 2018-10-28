import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose, withProps } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";

class GoogleMapDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			zoom: props.zoom,
			currentLocation: {
				lat: props.initialCenter.lat,
				lng: props.initialCenter.lng
			}
		};
	}

	componentDidMount() {
		this.setState({
			currentLocation: {
				lat: this.props.marker.lat,
				lng: this.props.marker.lng
			}
		});
	}

	render() {
		const {
			marker,
			onMarkerClick,
			movable,
			zoomable,
			draggable,
			markersClickable,
			markersDraggable,
			onMarkerDrag
		} = this.props;

		return (
			<GoogleMap
				defaultZoom={this.state.zoom}
				defaultCenter={{
					lat: parseFloat(this.state.currentLocation.lat),
					lng: parseFloat(this.state.currentLocation.lng)
				}}
				defaultOptions={{
					draggable: draggable,
					mapTypeControl: false,
					streetViewControl: false,
					zoomControl: zoomable,
					fullscreenControl: false
				}}
				gestureHandling={movable}
			>
					<Marker
						key={marker.id}
						position={{
							lat: parseFloat(marker.lat),
							lng: parseFloat(marker.lng)
						}}
						onClick={() => onMarkerClick(marker)}
						defaultClickable={markersClickable}
						draggable={markersDraggable}
						onDrag={marker => onMarkerDrag(marker)}
					/>
			</GoogleMap>
		);
	}
}

GoogleMapDetails.propTypes = {
	centerAroundCurrentLocation: PropTypes.bool,
	zoom: PropTypes.number.isRequired,
	width: PropTypes.string.isRequired,
	initialCenter: PropTypes.object,
	marker: PropTypes.object,
	onMarkerClick: PropTypes.func,
	movable: PropTypes.string,
	zoomable: PropTypes.bool,
	draggable: PropTypes.bool,
	markersClickable: PropTypes.bool,
	locationFromBottom: PropTypes.number,
	border: PropTypes.string,
	markersDraggable: PropTypes.bool,
	onMarkerDrag: PropTypes.func,
	height: PropTypes.string.isRequired,
};

GoogleMapDetails.defaultProps = {
	zoom: 10,
	width: "100%",
	initialCenter: {
		lat: 40.564714,
		lng: -105.09065
	},
	centerAroundCurrentLocation: true,
	markers: [],
	onMarkerClick: () => {},
	movable: "greedy",
	zoomable: true,
	draggable: true,
	markersClickable: true,
	markersDraggable: false,
	locationFromBottom: 0,
	border: "",
	onMarkerDrag: () => {}
};

export default compose(
	withProps(props => {
		return {
			googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBnLziZFF5VLvovFkHPEulNisGPllCJitE&v=3.exp&libraries=geometry,drawing,places`,
			loadingElement: <div style={{  }} />,
			containerElement: (
				<div
					style={{
						position: 'absolute',
						bottom: props.locationFromBottom,
						border: props.border,
						width: '100%'
					}}
				/>
			),
			mapElement: <div style={{ height: `${props.height}px`, width: "100%" }} />
		};
	}),
	withScriptjs,
	withGoogleMap
)(GoogleMapDetails);