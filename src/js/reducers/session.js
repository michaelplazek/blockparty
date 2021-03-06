import { stateReducer } from "./utils";
import {
  LOG_IN,
  LOG_OUT,
  REGISTER_USER,
  USER_FROM_TOKEN,
  SESSION_LOAD,
  CURRENT_LOCATION_LOAD,
  SET_CURRENT_LOCATION,
  UPDATE_USER,
  DELETE_USER,
  SET_POST_LOGIN_PATH,
  CLEAR_POST_LOGIN_PATH,
} from "../actions";

const initialState = {
  loggedIn: false,
  username: "",
  bio: "",
  completedTransactions: 0,
  cancelledTransactions: 0,
  created: {
    $date: ""
  },
  userId: 0,
  error: "",
  sessionLoaded: false,
  location: {
    lat: 40.564714,
    lng: -105.09065
  },
  initialLocation: {
    lat: 40.564714,
    lng: -105.09065
  },
  locationLoaded: false,
  postLoginPath: '/',
};

const handlers = {
  [LOG_IN]: (state, action) => ({
    username: action.data.user.username,
    userId: action.data.user._id,
    bio: action.data.user.bio,
    completedTransactions: action.data.user.completedTransactions,
    cancelledTransactions: action.data.user.cancelledTransactions,
    created: action.data.user.created,
    error: "",
    loggedIn: true
  }),
  [REGISTER_USER]: (state, action) => ({
    username: action.data.user.username,
    userId: action.data.user._id,
    bio: action.data.user.bio,
    completedTransactions: action.data.user.completedTransactions,
    cancelledTransactions: action.data.user.cancelledTransactions,
    created: action.data.user.created,
    error: "",
    loggedIn: true
  }),
  [CURRENT_LOCATION_LOAD]: (state, action) => ({
    initialLocation: {
      lat: action.data.latitude,
      lng: action.data.longitude
    },
    location: {
      lat: action.data.latitude,
      lng: action.data.longitude
    },
    locationLoaded: true
  }),
  [SET_CURRENT_LOCATION]: (state, action) => ({
    location: {
      lat: action.data.latitude,
      lng: action.data.longitude
    }
  }),
  [USER_FROM_TOKEN]: (state, action) => ({
    username: action.data.user.username,
    userId: action.data.user._id,
    bio: action.data.user.bio,
    completedTransactions: action.data.user.completedTransactions,
    cancelledTransactions: action.data.user.cancelledTransactions,
    created: action.data.user.created,
    error: "",
    loggedIn: true
  }),
  [UPDATE_USER]: (state, action) => ({
    username: action.data.username,
    bio: action.data.bio
  }),
  [SESSION_LOAD]: () => ({
    sessionLoaded: true
  }),
  [SET_POST_LOGIN_PATH]: (state, action) => ({
    postLoginPath: action.data
  }),
  [CLEAR_POST_LOGIN_PATH]: () => ({
    postLoginPath: initialState.postLoginPath
  }),
  [LOG_OUT]: () => ({ ...initialState }),
  [DELETE_USER]: () => ({ ...initialState })
};

export default stateReducer(initialState, handlers);
