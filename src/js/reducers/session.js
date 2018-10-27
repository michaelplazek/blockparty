import { stateReducer } from "./utils";
import {
  LOG_IN,
  LOG_OUT,
  REGISTER_USER,
  USER_FROM_TOKEN,
  SESSION_LOAD
} from "../actions";

const initialState = {
  loggedIn: false,
  username: "",
  userId: 0,
  error: "",
  sessionLoaded: false
};

const handlers = {
  [LOG_IN]: (state, action) => ({
    username: action.data.user.username,
    userId: action.data.user._id,
    error: "",
    loggedIn: true
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
