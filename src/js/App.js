import React from 'react';
import { hot, setConfig } from 'react-hot-loader'

import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';

import Market from './screens/Market';
import Post from './screens/Post';

setConfig({logLevel: 'no-errors-please'});
const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={Market} />
            <Route path="/post" component={Post} />
        </div>
    </Router>
);

export default hot(module)(App);