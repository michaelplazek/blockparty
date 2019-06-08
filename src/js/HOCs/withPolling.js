import React from "react";

/**
 * This HOC provides a component that polls using the passed in function.
 * @param func: function to be polled
 * @param duration: the amount of time between polls
 * @returns {*}
 */
export default (func, duration = 2000) => Component =>
  class extends React.Component {
    componentDidMount() {
      const executeFunction = () => func(this.props);
      this.dataPolling = setInterval(executeFunction, duration);
    }
    componentWillUnmount() {
      clearInterval(this.dataPolling);
    }
    render() {
      return <Component {...this.props} />;
    }
  };
