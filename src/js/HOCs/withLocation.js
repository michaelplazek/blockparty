import React from "react";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router";

import { loadCurrentLocation } from "../actions/session";
import mapper from "../utils/connect";
import {
  selectCurrentLocation,
  selectCurrentLocationLoaded
} from "../selectors";

/**
 * This HOC gets the users current location, using the navigation API.
 * @param ProtectedRoute
 * @returns {*}
 */
export default ProtectedRoute => {
  const LocationHOC = props => {
    return <ProtectedRoute {...props} />;
  };

  const propMap = {
    currentLocation: selectCurrentLocation,
    currentLocationLoaded: selectCurrentLocationLoaded
  };

  const actionMap = {
    loadCurrentLocation
  };

  return compose(
    mapper(propMap, actionMap),
    withRouter,
    lifecycle({
      componentDidMount() {
        const { loadCurrentLocation, currentLocationLoaded } = this.props;
        if (navigator && navigator.geolocation && !currentLocationLoaded) {
          loadCurrentLocation();
        }
      }
    })
  )(LocationHOC);
};
