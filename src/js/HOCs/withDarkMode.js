import React from "react";
import { compose } from "recompose";

import mapper from "../utils/connect";
import { selectIsDarkMode } from "../selectors";
import { setVisited as setVisitedAction } from "../actions/app";

/**
 * This HOC sets visited to true if you are logged in
 * @param Component
 * @returns {*}
 */
export default Component => {
  const darkModeHOC = props => (
    <Component {...props} />
  );

  const propMap = {
    isDarkMode: selectIsDarkMode,
  };

  const actionMap = {
    setVisited: setVisitedAction
  };

  return compose(
    mapper(propMap, actionMap),
  )(darkModeHOC);
};