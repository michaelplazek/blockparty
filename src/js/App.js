import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import { hot } from 'react-hot-loader'

import Market from './screens/Market';

const App = () => (
    <Router>
        <Route path="/" component={Market}/>
    </Router>
);

export default hot(module)(App);