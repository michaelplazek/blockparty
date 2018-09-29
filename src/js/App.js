import React from 'react';
import { hot, setConfig } from 'react-hot-loader'

import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
setConfig({logLevel: 'no-errors-please'});

import Market from './screens/Market';

const App = () => (
    <Router>
        <Route path="/" component={Market}/>
    </Router>
);

export default hot(module)(App);