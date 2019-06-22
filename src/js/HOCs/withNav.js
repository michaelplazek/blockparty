import React, { Fragment } from "react";
import FooterNav from "../components/FooterNav";

/**
 * This HOC adds the navigation footer to the screen
 * @param ProtectedRoute
 * @returns {*}
 */
export default ProtectedRoute => {
  const NavHOC = props => {
    return (
      <Fragment>
        <ProtectedRoute {...props} />
        <FooterNav />
      </Fragment>
    );
  };

  return NavHOC;
};
