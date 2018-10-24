import { combineReducers } from "redux";

import posts from './asks';
import layers from './layers';
import session from './session';
import app from './app';
import filters from './filters';
import ask from './ask';

export default combineReducers({
	app,
	posts,
	layers,
	session,
	filters,
	ask,
})