import React from "react";
import { compose } from "recompose";

import Splash from "../components/Splash";
import mapper from "../utils/connect";
import { selectVisited } from "../selectors";

/**
 * This HOC provides a component wrapped with a splash screen. Needs a "visited" prop
 * @param Component
 * @returns {*}
 */
export default Component => {
  const splashHOC = props => {
    const { visited } = props;
    return visited ? <Component {...props} /> : <Splash />;
  };

  const propMap = {
    visited: selectVisited
  };

  return compose(mapper(propMap, {}))(splashHOC);
};
