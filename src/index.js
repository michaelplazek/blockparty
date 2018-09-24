import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './js/reducers'

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk),
));
let content = document.getElementById('content');
ReactDOM.render(<Provider store={store}><div>Index</div></Provider>, content);