import React from 'react';
import { compose } from 'recompose';

import {
    Route,
} from 'react-router-dom';

import mapper from "./utils/connect";
import { loadUserFromToken as loadUserFromTokenAction } from "./actions/session";

import withAuthentification from "./HOCs/withAuthentification";
import { withRouter } from "react-router";

const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
    }
});
const ProtectedRoute = ({ route }) => {
    console.log(route);
    return <Route
        exact={route.exact}
        component={route.component}
        path={route.path}
    />
};

const propMap = {

};

const actionMap = {
    loadUserFromToken: loadUserFromTokenAction
};

export default compose(
    mapper(propMap, actionMap),
    withRouter,
    // withAuthentification,
)(ProtectedRoute);