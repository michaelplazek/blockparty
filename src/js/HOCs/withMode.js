import React from "react";
import { compose, lifecycle } from "recompose";

import mapper from "../utils/connect";
import { selectModeLoaded, selectUserId } from "../selectors";
import { getMode as getModeAction } from "../actions/app";

/**
 * This HOC gets the users mode (dark or light) and sets it in redux
 * @param ProtectedRoute
 * @returns {*}
 */
export default ProtectedRoute => {
  const ModeHOC = props => {
    return <ProtectedRoute {...props} />;
  };

  const propMap = {
    userId: selectUserId,
    loaded: selectModeLoaded
  };

  const actionMap = {
    getMode: getModeAction
  };

  return compose(
    mapper(propMap, actionMap),
    lifecycle({
      componentDidMount() {
        const { loaded, getMode, userId } = this.props;
        if (!loaded) {
          const dark = window.localStorage.getItem("dark");
          if (!dark) {
            getMode(userId);
          }
        }
      }
    })
  )(ModeHOC);
};
