import { stateReducer } from "./utils";
import {
  LOAD_NAV_HEIGHT,
  LOAD_HEADER_HEIGHT,
  LOAD_WINDOW_HEIGHT,
  LOAD_WINDOW_WIDTH,
  SET_MARKET_VIEW,
  SET_SUBSCRIPTION,
  GET_SUBSCRIPTION,
  SET_VISITED,
  SET_NAV_INDEX,
  SET_RUN,
  SET_TOUCHED,
  SET_ASK_INFO,
  SET_BID_INFO,
  SET_LIST_OPEN,
  SET_DARK_MODE
} from "../actions";
import { MAP } from "../constants/app";
import { getIndexFromPath } from "../utils/location";

const initialState = {
  navigationBarHeight: 0,
  navigationIndex: getIndexFromPath(window.location.pathname),
  headerHeight: 0,
  windowHeight: 0,
  windowWidth: 0,
  marketView: MAP,
  notifications: {
    isSubscribed: false,
    subscription: {}
  },
  visited: false,
  run: false,
  touched: false,
  askInfo: "Mid Market Price",
  bidInfo: undefined,
  listOpen: false,
  darkMode: false,
};

const handlers = {
  [LOAD_NAV_HEIGHT]: (_, action) => ({
    navigationBarHeight: action.data
  }),
  [LOAD_HEADER_HEIGHT]: (_, action) => ({
    headerHeight: action.data
  }),
  [LOAD_WINDOW_HEIGHT]: (_, action) => ({
    windowHeight: action.data
  }),
  [LOAD_WINDOW_WIDTH]: (_, action) => ({
    windowWidth: action.data
  }),
  [SET_MARKET_VIEW]: (_, action) => ({
    marketView: action.data
  }),
  [SET_SUBSCRIPTION]: state => ({
    notifications: {
      ...state.notifications,
      isSubscribed: true
    }
  }),
  [GET_SUBSCRIPTION]: state => ({
    notifications: {
      ...state.notifications,
      isSubscribed: true
    }
  }),
  [SET_VISITED]: () => ({
    visited: true
  }),
  [SET_NAV_INDEX]: (_, action) => ({
    navigationIndex: action.data
  }),
  [SET_RUN]: (state, action) => ({
    run: action.data
  }),
  [SET_TOUCHED]: (state, action) => ({
    touched: action.data
  }),
  [SET_ASK_INFO]: (state, action) => ({
    askInfo: action.data
  }),
  [SET_BID_INFO]: (state, action) => ({
    bidInfo: action.data
  }),
  [SET_LIST_OPEN]: (state, action) => ({
    listOpen: action.data
  }),
  [SET_DARK_MODE]: (state, action) => ({
    darkMode: action.data
  })
};

export default stateReducer(initialState, handlers);
