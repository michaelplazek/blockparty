import React from "react";
import { compose } from "recompose";

import {Typography} from "@material-ui/core";
import mapper from "../utils/connect";
import {selectIsDarkMode} from "../selectors";

/**
 * This HOC provides a component wrapped with a loader. Needs a "loaded" prop
 * @param Component
 * @returns {*}
 */
export default Component => {
  const LoaderHOC = props => {
    return props.loaded ? <Component {...props} /> : <Typography color={props.isDarkMode ? 'textSecondary' : undefined}>Loading...</Typography>;
  };

  const propMap = {
    isDarkMode: selectIsDarkMode
  };

  return compose(
    mapper(propMap, {})
  )(LoaderHOC);
};
