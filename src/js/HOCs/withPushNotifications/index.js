import React from "react";
import { compose, lifecycle } from "recompose";

import mapper from "../../utils/connect";
import { registerWorker } from "./utils";
import {selectIsSubscribed, selectSwRegistration, selectUserId} from "../../selectors";

import {
  setSubscription as setSubscriptionAction,
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
    userId: selectUserId,
  };

  const actionMap = {
    setSubscription: setSubscriptionAction,
  };

  return compose(
    mapper(propMap, actionMap),
    lifecycle({
      componentDidMount() {
        const { userId, setSubscription } = this.props;
        registerWorker(userId, setSubscription);
      },
    })
  )(pushHOC);
};