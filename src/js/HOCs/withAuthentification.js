import React from "react";
import { compose, lifecycle } from "recompose";
import { Redirect, withRouter } from "react-router";
import find from 'lodash/find';

import {
  getSession,
  loadUserFromToken as loadUserFromTokenAction,
  setPostLoginPath as setPostLoginPathAction
} from "../actions/session";
import mapper from "../utils/connect";
import {
  selectIsLoggedIn,
  selectSessionLoaded,
} from "../selectors";

import routes from "../config/routes";
import Loading from "../components/Loading";

/**
 * This HOC provides the routing and authentication for user sessions.
 * @param ProtectedRoute
 * @returns {*}
 */
export default ProtectedRoute => {
  const AuthHOC = props => {
    const path = props.history.location.pathname;
    const navigationItem = find(routes, item => item.path === path);
    const shouldRedirect = navigationItem.protected;
    if (!props.sessionLoaded && getSession()) {
      return <Loading />;
    } else if (!props.loggedIn && shouldRedirect) {
      props.setPostLoginPath(path);
      return <Redirect to="/login" />;
    } else {
      return <ProtectedRoute {...props} />
    }
  };

  const propMap = {
    loggedIn: selectIsLoggedIn,
    sessionLoaded: selectSessionLoaded,
  };

  const actionMap = {
    loadUserFromToken: loadUserFromTokenAction,
    setPostLoginPath: setPostLoginPathAction
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
