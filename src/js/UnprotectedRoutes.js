import React from 'react';
import { compose } from 'recompose';

import {
    Route,
} from 'react-router-dom';

import mapper from "./utils/connect";
import { unprotectedRoutes as routes } from './config/routes';
import { loadUserFromToken as loadUserFromTokenAction } from "./actions/session";

import FooterNav from "./components/FooterNav";
import withAuthentification from "./HOCs/withAuthentification";
import {Switch, withRouter} from "react-router";

const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
    }
});
const UnprotectedRoutes = () => (
    <div>
        <div>
            {routes.map(route =>
                <Route
                    exact={route.exact}
                    component={route.component}
                    path={route.path}
                    key={route.index}
                />
            )}
        </div>
    </div>
);

// const propMap = {
//
// };
//
// const actionMap = {
//     loadUserFromToken: loadUserFromTokenAction
// };

export default compose(
    withRouter,
    // mapper(propMap, actionMap),
)(UnprotectedRoutes);