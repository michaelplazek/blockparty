import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Grommet, hpe as theme } from 'grommet';

import reducers from './js/reducers'
import App from './js/App';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk),
));
let content = document.getElementById('content');
ReactDOM.render(
    <Provider store={store}>
        <Grommet theme={theme} full={true}>
            <App />
        </Grommet>
    </Provider>
, content);