import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';

import 'grommet/grommet-hpinc.min.css';
import './style.css';

let content = document.getElementById('content');
ReactDOM.render(<div>Index</div>, content);