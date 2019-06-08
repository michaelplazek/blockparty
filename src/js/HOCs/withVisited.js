import React from "react";
import { compose, lifecycle } from "recompose";

import Splash from "../components/Splash";
import mapper from "../utils/connect";
import { selectIsLoggedIn, selectVisited } from "../selectors";
import { setVisited as setVisitedAction } from "../actions/app";

/**
 * This HOC sets visited to true if you are logged in
 * @param Component
 * @returns {*}
 */
export default Component => {
  const visitedHOC = props => {
    const { visited } = props;
    return visited ? <Component {...props} /> : <Splash />;
  };

  const propMap = {
    visited: selectVisited,
    loggedIn: selectIsLoggedIn
  };

  const actionMap = {
    setVisited: setVisitedAction
  };

  return compose(
    mapper(propMap, actionMap),
    lifecycle({
      componentDidMount() {
        const { visited, setVisited, loggedIn } = this.props;
        if (loggedIn && !visited) {
          setVisited();
        }
      }
    })
  )(visitedHOC);
};
