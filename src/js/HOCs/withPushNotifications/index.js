import React from "react";
import { compose, lifecycle } from "recompose";

import mapper from "../../utils/connect";
import { registerWorker } from "./utils";
import { selectIsSubscribed, selectSwRegistration } from "../../selectors";

import {
  setSubscribed as setSubscribedAction,
  setSwRegistration as setSwRegistrationAction
} from "../../actions/app";

/**
 * This HOC sets a service worker for push notifications,
 * @param Component
 * @returns {*}
 */
export default Component => {
  const pushHOC = props => {
    return <Component {...props} />;
  };

  const propMap = {
    isSubscribed: selectIsSubscribed,
    swReg: selectSwRegistration,
  };

  const actionMap = {
    setSubscribed: setSubscribedAction,
    setSwRegistration: setSwRegistrationAction
  };

  return compose(
    mapper(propMap, actionMap),
    lifecycle({
      componentDidMount() {
        registerWorker();
      },
    })
  )(pushHOC);
};