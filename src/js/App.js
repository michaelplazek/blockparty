import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';

import Market from './screens/Market';

const App = () => (
    <Router>
        <Route path="/" component={Market}/>
    </Router>
);

export default App;