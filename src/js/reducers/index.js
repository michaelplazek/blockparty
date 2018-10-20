import { combineReducers } from "redux";
import posts from './posts';
import layers from './layers';
import session from './session';

export default combineReducers({
    posts,
    layers,
    session,
})