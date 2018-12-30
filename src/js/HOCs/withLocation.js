import React from "react";
import { compose, lifecycle } from "recompose";
import { Redirect, withRouter } from "react-router";

import {
    getSession,
    loadUserFromToken as loadUserFromTokenAction
} from "../actions/session";
import mapper from "../utils/connect";
import { selectIsLoggedIn, selectSessionLoaded } from "../selectors";

import Loading from "../components/Loading";

/**
 * This HOC gets the users current location, using the navigation API.
 * @param ProtectedRoute
 * @returns {*}
 */
export default ProtectedRoute => {
    const LocationHOC = props => {
        const path = props.history.location.pathname;
        const shouldRedirect = !(path === "/login" || path === "/register");

        if (!props.sessionLoaded && getSession()) {
            return <Loading />;
        } else {
            return shouldRedirect && !props.loggedIn ? (
                <Redirect to="/login" />
            ) : (
                <ProtectedRoute {...props} />
            );
        }
    };

    const propMap = {
        loggedIn: selectIsLoggedIn,
        sessionLoaded: selectSessionLoaded
    };

    const actionMap = {
        loadUserFromToken: loadUserFromTokenAction
    };

    return compose(
        mapper(propMap, actionMap),
        withRouter,
        lifecycle({
            componentDidMount() {
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
        })
    )(LocationHOC);
};
