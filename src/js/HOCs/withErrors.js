import React from "react";
import ErrorNotification from "../components/ErrorNotification";

/**
 * This HOC adds an error notification bar.
 * @param Component
 * @returns {*}
 */
export default Component => {
  const ErrorHOC = props => {
    return (
      <div>
        <ErrorNotification />
        <Component {...props} />
      </div>
    );
  };

  return ErrorHOC;
};
