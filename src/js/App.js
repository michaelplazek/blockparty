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

setConfig({logLevel: 'no-errors-please'});
const App = ({ setLayer, LAYER }) => (
    <Box background={{ color: 'light-1' }} fill={true} overflow='hidden'>
        <Navigation />
        { LAYER === 'NAVIGATION' &&
        <Layer
            modal={true}
            responsive={true}
            full='vertical'
            background={{ color: 'dark-4' }}
            onClickOutside={() => {setLayer('')}}
            position='left'
        >
            <NavigationFlyout />
        </Layer> }
        <Router>
            <div>
                {routes.map(route =>
                    <Route
                        exact={route.exact}
                        component={route.component}
                        path={route.path}
                        key={route.index}
                    />)
                }
            </div>
        </Router>
    </Box>
);

const propMap = {
    LAYER: selectLayer,
};

const actionMap = {
    setLayer: setLayerAction,
};

export default compose(
    mapper(propMap, actionMap),
    hot(module)
)(App);