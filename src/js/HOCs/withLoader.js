import React from "react";
import { compose } from "recompose";

import Loading from "../components/Loading";

/**
 * This HOC provides a component wrapped with a loader. Needs a "loaded" prop
 * @param Component
 * @returns {*}
 */
export default Component => {
  const LoaderHOC = props => {
    return props.loaded ? <Component {...props} /> : "Loading...";
  };
  return compose()(LoaderHOC);
};
