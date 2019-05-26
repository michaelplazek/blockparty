import React from "react";
import { compose, lifecycle } from "recompose";

import mapper from "../../utils/connect";
import { registerWorker } from "./utils";
import {selectIsSubscribed, selectUserId} from "../../selectors";

import {
  getSubscription as getSubscriptionAction,
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
    userId: selectUserId,
  };

  const actionMap = {
    setSubscription: setSubscriptionAction,
    getSubscription: getSubscriptionAction,

  };

  return compose(
    mapper(propMap, actionMap),
    lifecycle({
      componentDidMount() {
        const { userId, setSubscription, getSubscription } = this.props;
        registerWorker(userId, setSubscription, getSubscription);
      },
    })
  )(pushHOC);
};