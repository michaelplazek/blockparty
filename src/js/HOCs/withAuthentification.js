import React from 'react'
import { compose, lifecycle } from 'recompose';
import { Redirect, withRouter } from "react-router";

import { getSession, loadUserFromToken as loadUserFromTokenAction } from "../actions/session";
import mapper from "../utils/connect";
import { selectIsLoggedIn, selectSessionLoaded } from "../selectors";

import Loading from "../components/Loading";

export default (ProtectedRoute) => {
    const AuthHOC = (props) => {
        const path = props.history.location.pathname;
        const shouldRedirect = !(path === '/login' || path === '/register');

        console.log(getSession());
        if (!props.sessionLoaded && getSession()){
            return (<Loading />);
        } else {
            return shouldRedirect && !props.loggedIn ? <Redirect to='/login'/> : <ProtectedRoute {...props} />
        }
    };

    const propMap = {
        loggedIn: selectIsLoggedIn,
        sessionLoaded: selectSessionLoaded
    };

    const actionMap = {
        loadUserFromToken: loadUserFromTokenAction,
    };

    return compose(
        mapper(propMap, actionMap),
        withRouter,
        lifecycle({
            componentDidMount() {
                if (window.performance) {
                    if (performance.navigation.type === 1) {
                        this.props.loadUserFromToken();
                    }
                }
            }
        })
    )(AuthHOC)
};