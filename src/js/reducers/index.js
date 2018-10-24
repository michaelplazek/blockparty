import { combineReducers } from "redux";

import asks from './asks';
import layers from './layers';
import session from './session';
import app from './app';
import filters from './filters';
import ask from './ask';

export default combineReducers({
	app,
	asks,
	layers,
	session,
	filters,
	ask,
})