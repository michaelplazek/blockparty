import React from 'react';
import { compose } from 'recompose';
import { hot, setConfig } from 'react-hot-loader'

import { BrowserRouter as Router } from 'react-router-dom';
import Routes from "./Routes";

import withStyles from "@material-ui/core/styles/withStyles";

setConfig({logLevel: 'no-errors-please'});
const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
    }
});
const App = ({ classes }) => (
    <div className={classes.root}>
        <Router>
            <Routes />
        </Router>
    </div>
);

export default compose(
    hot(module),
    withStyles(styles),
)(App);