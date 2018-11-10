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
 * This HOC provides the routing and authentication for user sessions.
 * @param ProtectedRoute
 * @returns {*}
 */
export default ProtectedRoute => {
  const AuthHOC = props => {
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
          this.props.loadUserFromToken();
      }
    })
  )(AuthHOC);
};
