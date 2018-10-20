import React from 'react';
import { compose, lifecycle } from 'recompose';
import { hot, setConfig } from 'react-hot-loader'

import {
    BrowserRouter as Router, Route,
} from 'react-router-dom';
import { withRouter, Switch } from 'react-router';

import mapper from "./utils/connect";
import { loadUserFromToken as loadUserFromTokenAction } from "./actions/session";

import FooterNav from "./components/FooterNav";
import withStyles from "@material-ui/core/styles/withStyles";
import ProtectedRoutes from "./ProtectedRoutes";
import UnprotectedRoutes from "./UnprotectedRoutes";
import routes from "./config/routes";
import ProtectedRoute from "./ProtectedRoute";
import withAuthentification from "./HOCs/withAuthentification";

const App = () => (
    <div>
        {routes.map(route =>
            <Route
                exact={route.exact}
                component={route.component}
                path={route.path}
                key={route.index}
            />
        )}
        <div>
            <FooterNav />
        </div>
    </div>
);

export default compose(
    // mapper(propMap, actionMap),
    withRouter,
    // hot(module),
    // withStyles(styles),
    withAuthentification,
)(App);