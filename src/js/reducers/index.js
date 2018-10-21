import { combineReducers } from "redux";

import posts from './posts';
import layers from './layers';
import session from './session';
import app from './app';
import filters from './filters';
import post from './post';

export default combineReducers({
	app,
	posts,
	layers,
	session,
	filters,
	post,
})