import React, { Component } from "react";
import PropTypes from "prop-types";
import numeral from "numeral";
import { compose, withProps, withHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import { USD } from "../../constants/currency";
import { getCoinIcon } from "../List/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrosshairs } from "@fortawesome/free-solid-svg-icons";
import Paper from "@material-ui/core/Paper";

const darkMode = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }]
  }
];

class GoogleMapsWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: props.zoom,
      currentLocation: {
        lat: props.currentLocation.lat,
        lng: props.currentLocation.lng
      }
    };
  }

  render() {
    const {
      markers,
      onMarkerClick,
      movable,
      zoomable,
      draggable,
      markersClickable,
      markersDraggable,
      onMarkerDrag,
      showLabels,
      onMapMounted,
      onBoundsChanged,
      showCenterIcon,
      handleCenter,
      height,
      navHeight,
      windowHeight,
      isDarkMode
    } = this.props;

    return (
      <GoogleMap
        google={this.props.google}
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
          fullscreenControl: false,
          styles: !isDarkMode ? [] : darkMode
        }}
        gestureHandling={movable}
        ref={onMapMounted}
        onBoundsChanged={onBoundsChanged}
      >
        {showCenterIcon && (
          <Paper
            style={{
              position: "absolute",
              left: "0.75em",
              top: `${windowHeight - navHeight - height + 10}px`,
              zIndex: 50,
              color: "#666666",
              cursor: "pointer",
              padding: `0.5em`
            }}
          >
            <FontAwesomeIcon
              size="lg"
              icon={faCrosshairs}
              onClick={handleCenter}
            />
          </Paper>
        )}

        {showLabels &&
          markers.map(item => (
            <InfoWindow
              key={item.id}
              options={{
                pixelOffset: new google.maps.Size(0, -45)
              }}
              position={{
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lng)
              }}
            >
              <div
                onClick={() => onMarkerClick(item)}
                style={{
                  cursor: "pointer",
                  margin: '10px'
                }}
              >
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item style={{ margin: "4px 4px 0px 0px" }}>
                        {getCoinIcon(item.coin, isDarkMode, 15)}
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <Grid item>
                            <Typography variant="subheading">
                              {item.volume}
                            </Typography>
                          </Grid>
                          <Grid item style={{ margin: "2px 0px 0px 4px" }}>
                            <Typography>{item.coin}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography
                      color={isDarkMode ? "primary" : undefined}
                      variant="caption"
                    >
                      {item.isBid ? "sell" : "buy"} at{" "}
                      {numeral(item.price).format(USD)}/{item.coin}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </InfoWindow>
          ))}

        {markers.map(item => (
          <Marker
            style={{
              color: 'blue'
            }}
            key={item.id}
            position={{
              lat: parseFloat(item.lat),
              lng: parseFloat(item.lng)
            }}
            onClick={() => onMarkerClick(item)}
            defaultClickable={markersClickable}
            draggable={markersDraggable}
            onDrag={item => onMarkerDrag(item)}
          />
        ))}
      </GoogleMap>
    );
  }
}

GoogleMapsWrapper.propTypes = {
  centerAroundCurrentLocation: PropTypes.bool,
  zoom: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  currentLocation: PropTypes.object,
  markers: PropTypes.array,
  onMarkerClick: PropTypes.func,
  movable: PropTypes.string,
  zoomable: PropTypes.bool,
  draggable: PropTypes.bool,
  markersClickable: PropTypes.bool,
  locationFromBottom: PropTypes.number,
  border: PropTypes.string,
  markersDraggable: PropTypes.bool,
  onMarkerDrag: PropTypes.func,
  showLabels: PropTypes.bool,
  showCenterIcon: PropTypes.bool
};

GoogleMapsWrapper.defaultProps = {
  zoom: 10,
  position: "absolute",
  width: "100%",
  currentLocation: {
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
  onMarkerDrag: () => {},
  showLabels: false,
  showCenterIcon: false
};

export default compose(
  withProps(props => {
    return {
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
        process.env.GOOGLE_MAPS_KEY
      }&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: (
        <div
          style={{
            position: props.position,
            bottom: props.locationFromBottom,
            height: props.height,
            border: props.border,
            width: props.width
          }}
        />
      ),
      mapElement: (
        <div className="map" style={{ height: props.height, width: "100%" }} />
      )
    };
  }),
  withScriptjs,
  withGoogleMap,
  withHandlers(() => {
    let map;
    return {
      onMapMounted: () => ref => {
        map = ref;
      },
      onBoundsChanged: ({ handleBoundsChanged }) => () => {
        const latitude = map.getCenter().lat();
        const longitude = map.getCenter().lng();
        const coords = { latitude, longitude };
        handleBoundsChanged(coords);
      },
      handleCenter: ({ initialLocation }) => () => {
        map.panTo(
          new google.maps.LatLng(initialLocation.lat, initialLocation.lng)
        );
      }
    };
  }),
)(GoogleMapsWrapper);
