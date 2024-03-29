import React from "react";
import { compose } from "recompose";

import { Route } from "react-router-dom";
import { Switch, withRouter } from "react-router";

import routes from "./config/routes";
import withAuthentification from "./HOCs/withAuthentification";
import withErrors from "./HOCs/withErrors";
import withCurrencyData from "./HOCs/withCurrencyData";
import withDimensions from "./HOCs/withDimensions";

const Routes = () => (
  <div>
    <Switch>
      {routes.map(route => (
        <Route
          exact={route.exact}
          component={route.component}
          path={route.path}
          key={route.index}
        />
      ))}
    </Switch>
  </div>
);

export default compose(
  withRouter,
  withDimensions,
  withAuthentification,
  withErrors,
  withCurrencyData
)(Routes);
