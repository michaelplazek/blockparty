import React from "react";
import { compose } from "recompose";

import { Route } from "react-router-dom";
import {Switch, withRouter} from "react-router";

import FooterNav from "./components/FooterNav";
import routes from "./config/routes";
import withAuthentification from "./HOCs/withAuthentification";
import Oops from "./screens/Oops";

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
    <div>
      <FooterNav />
    </div>
  </div>
);

export default compose(
  withRouter,
  withAuthentification
)(Routes);
