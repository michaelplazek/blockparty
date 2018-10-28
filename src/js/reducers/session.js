import { stateReducer } from "./utils";
import {
  LOG_IN,
  LOG_OUT,
  REGISTER_USER,
  USER_FROM_TOKEN,
  SESSION_LOAD,
  CURRENT_LOCATION_LOAD
} from "../actions";

const initialState = {
  loggedIn: false,
  username: "",
  userId: 0,
  error: "",
  sessionLoaded: false,
  location: {
    lat: 40.564714,
    lng: -105.09065
  }
};

const handlers = {
  [LOG_IN]: (state, action) => ({
    username: action.data.user.username,
    userId: action.data.user._id,
    error: "",
    loggedIn: true
  }),
  [CURRENT_LOCATION_LOAD]: (state, action) => ({
    location: {
      lat: action.data.latitude,
      lng: action.data.longitude
    }
  }),
  [REGISTER_USER]: (state, action) => ({
    username: action.data.user.username,
    userId: action.data.user._id,
    error: "",
    loggedIn: true
  }),
  [USER_FROM_TOKEN]: (state, action) => ({
    username: action.data.user.username,
    userId: action.data.user._id,
    error: "",
    loggedIn: true
  }),
  [SESSION_LOAD]: () => ({
    sessionLoaded: true
  }),
  [LOG_OUT]: () => ({ ...initialState })
};

export default stateReducer(initialState, handlers);
