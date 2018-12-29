import React, { Component } from "react";
import PropTypes from "prop-types";
import numeral from "numeral";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { smallIconMap } from "../../constants/coin-icons";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import { USD } from "../../constants/currency";

class GoogleMapsWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: props.zoom,
      currentLocation: {
        // lat: props.initialCenter.lat,
        // lng: props.initialCenter.lng
      }
    };
  }

  componentDidMount() {
    console.log('navigator', navigator);
    console.log('geo', navigator.geolocation);

    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
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
      showLabels
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
          fullscreenControl: false
        }}
        gestureHandling={movable}
      >
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
                style={{ cursor: "pointer" }}
              >
                <Grid container direction="column">
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item style={{ margin: "4px 4px 0px 0px" }}>
                        {smallIconMap[item.coin]}
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
                    <Typography variant="caption">
                      at {numeral(item.price).format(USD)}/{item.coin}
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </InfoWindow>
          ))}

        {markers.map(item => (
          <Marker
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
  initialCenter: PropTypes.object,
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
  showLabels: PropTypes.bool
};

GoogleMapsWrapper.defaultProps = {
  zoom: 10,
  position: "absolute",
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
  onMarkerDrag: () => {},
  showLabels: false
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
      mapElement: <div style={{ height: props.height, width: "100%" }} />
    };
  }),
  withScriptjs,
  withGoogleMap
)(GoogleMapsWrapper);
