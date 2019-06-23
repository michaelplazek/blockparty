import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import CssBaseline from "@material-ui/core/CssBaseline";

import reducers from "./js/reducers";
import App from "./js/App";

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

let content = document.getElementById("content");
ReactDOM.render(
  <Provider store={store}>
    <CssBaseline>
      <App />
    </CssBaseline>
  </Provider>,
  content
);
