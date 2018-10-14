import React from 'react';
import { compose, lifecycle } from 'recompose';
import { hot, setConfig } from 'react-hot-loader'

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import mapper from "./utils/connect";
import routes from './config/routes';
import { loadUserFromToken as loadUserFromTokenAction } from "./actions/session";

import FooterNav from "./components/FooterNav";
import withStyles from "@material-ui/core/styles/withStyles";
import withAuthentification from "./HOCs/withAuthentification";

setConfig({logLevel: 'no-errors-please'});
const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
    }
});
const App = ({ classes }) => (
    <div
        className={classes.root}
    >
        <Router>
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
                <div>
                    <FooterNav />
                </div>
            </div>
        </Router>
    </div>
);

const propMap = {

};

const actionMap = {
    loadUserFromToken: loadUserFromTokenAction
};

export default compose(
    mapper(propMap, actionMap),
    hot(module),
    withStyles(styles),
    lifecycle({
        componentWillMount() {
            const { loadUserFromToken } = this.props;
            if (performance.navigation.type === 1) {
                loadUserFromToken();
            }
        }
    }),
    withAuthentification,
)(App);