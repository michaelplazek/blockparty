import { combineReducers } from "redux";

import posts from './posts';
import layers from './layers';
import session from './session';
import app from './app';

export default combineReducers({
	posts,
	layers,
	session,
	app,
})