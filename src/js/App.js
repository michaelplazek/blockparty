import React from 'react';
import { compose } from 'recompose';
import { hot, setConfig } from 'react-hot-loader'
import { Box, Layer } from'grommet';

import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

import Market from './screens/Market';
import Post from './screens/Post';
import Navigation from "./components/Navigation";
import NavigationFlyout from "./components/LayerModal/NavigationFlyout";
import mapper from "./utils/connect";
import routes from './config/routes';
import { selectLayer } from "./selectors";
import { setLayer as setLayerAction } from "./actions/layers";
import FooterNav from "./components/FooterNav";
import withStyles from "@material-ui/core/styles/withStyles";
// import Grid from '@material-ui/core/Grid/Grid';
// import classNames from 'classnames';
// import withStyles from "@material-ui/core/es/styles/withStyles";

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
                {routes.map(route =>
                    <Route
                        exact={route.exact}
                        component={route.component}
                        path={route.path}
                        key={route.index}
                    />
                )}
            </div>
        </Router>
        <Box>
            <FooterNav />
        </Box>
    </div>
);

const propMap = {
    LAYER: selectLayer,
};

const actionMap = {
    setLayer: setLayerAction,
};

export default compose(
    mapper(propMap, actionMap),
    hot(module),
    withStyles(styles),
)(App);