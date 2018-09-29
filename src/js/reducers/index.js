import { combineReducers } from "redux";
import posts from './posts';
import layers from './layers';

export default combineReducers({
    posts,
    layers,
})