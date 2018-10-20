import React from 'react'
import { compose, lifecycle } from 'recompose';

import mapper from "../utils/connect";
import { selectIsLoggedIn } from "../selectors";
import { loadUserFromToken as loadUserFromTokenAction } from "../actions/session";
import { Redirect, withRouter } from "react-router";

export default (ProtectedRoute) => {
    const AuthHOC = (props) => {
        console.log(props);
        const location = props.history.location.pathname;
        const shouldRedirect = !(location === '/login' || location === '/register');
        return shouldRedirect && !props.loggedIn ? <Redirect to='/login'/> : <ProtectedRoute {...props} />
    };

    const propMap = {
        loggedIn: selectIsLoggedIn,
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