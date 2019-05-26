import React from "react";

/**
 * This HOC provides a component that polls using the passed in function.
 * @param func: function to be polled
 * @param duration: the amount of time between polls
 * @returns {*}
 */
export default () => Component => (
  class extends React.Component {
    componentDidMount() {
      // set up push notifications
    }
    render() {
      return <Component {...this.props}/>;
    }
  }
);

