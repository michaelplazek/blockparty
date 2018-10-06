import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AppContainer } from 'react-hot-loader';

import reducers from './js/reducers'
import App from './js/App';

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk),
));
let content = document.getElementById('content');
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <CssBaseline>
                <App />
            </CssBaseline>
        </Provider>
    </AppContainer>
    , content);

if (module.hot) {
    module.hot.accept('./js/App.js', () => {
        ReactDOM.render(
            <AppContainer>
                <Provider store={store} >
                    <CssBaseline>
                        <App />
                    </CssBaseline>
                </Provider>
            </AppContainer>
            , content);
    });
}