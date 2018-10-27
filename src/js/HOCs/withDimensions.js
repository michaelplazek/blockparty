import React from "react";
import { compose, lifecycle, withHandlers } from "recompose";

import mapper from "../utils/connect";
import { selectWindowHeight, selectWindowWidth } from "../selectors";

import {
  setWindowHeight as setWindowHeightAction,
  setWindowWidth as setWindowWidthAction
} from "../actions/app";

/**
 * This HOC provides the wrapped component with the windows dimensions as props,
 * as well as storing those dimensions in redux.
 * @param Component
 * @returns {*}
 */
export default Component => {
  const DimensionsHOC = props => {
    return <Component {...props} />;
  };

  const propMap = {
    windowHeight: selectWindowHeight,
    windowWidth: selectWindowWidth
  };

  const actionMap = {
    setWindowHeight: setWindowHeightAction,
    setWindowWidth: setWindowWidthAction
  };

  return compose(
    mapper(propMap, actionMap),
    withHandlers({
      updateWindowDimensions: ({ setWindowHeight, setWindowWidth }) => () => {
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
      }
    }),
    lifecycle({
      componentDidMount() {
        this.props.updateWindowDimensions();
        window.addEventListener("resize", this.props.updateWindowDimensions);
      },
      componentWillUnmount() {
        window.removeEventListener("resize", this.props.updateWindowDimensions);
      }
    })
  )(DimensionsHOC);
};
