import React from "react";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router";
import mapper from "../utils/connect";
import { selectCurrencyNamesLoaded } from "../selectors";
import { loadCurrencyNames } from "../actions/metrics";

export default Component => {
  const DataHOC = props => {
    return (
      <div>
        <Component {...props} />
      </div>
    );
  };

  const propMap = {
    loaded: selectCurrencyNamesLoaded
  };

  const actionMap = {
    loadCurrencyNames
  };

  return compose(
    mapper(propMap, actionMap),
    withRouter,
    lifecycle({
      componentDidMount() {
        if (!this.props.loaded) {
          this.props.loadCurrencyNames();
        }
      }
    })
  )(DataHOC);
};
