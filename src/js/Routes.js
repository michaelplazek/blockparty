import React from "react";
import { compose } from "recompose";

import { Route } from "react-router-dom";
import { withRouter } from "react-router";

import FooterNav from "./components/FooterNav";
import routes from "./config/routes";
import withAuthentification from "./HOCs/withAuthentification";

const Routes = () => (
  <div>
    {routes.map(route => (
      <Route
        exact={route.exact}
        component={route.component}
        path={route.path}
        key={route.index}
      />
    ))}
    <div>
      <FooterNav />
    </div>
  </div>
);

export default compose(
  withRouter,
  withAuthentification
)(Routes);
