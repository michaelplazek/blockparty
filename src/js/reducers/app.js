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
} from "../actions";
import { MAP } from "../constants/app";
import {getIndexFromPath} from "../utils/location";

const initialState = {
  navigationBarHeight: 0,
  navigationIndex: getIndexFromPath(window.location.pathname),
  headerHeight: 0,
  windowHeight: 0,
  windowWidth: 0,
  marketView: MAP,
  notifications: {
    isSubscribed: false,
    subscription: {},
  },
  visited: false,
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
  [SET_SUBSCRIPTION]: (state) => ({
    notifications: {
      ...state.notifications,
      isSubscribed: true,
    }
  }),
  [GET_SUBSCRIPTION]: (state) => ({
    notifications: {
      ...state.notifications,
      isSubscribed: true,
    }
  }),
  [SET_VISITED]: () => ({
    visited: true
  }),
  [SET_NAV_INDEX]: (_, action) => ({
    navigationIndex: action.data,
  })
};

export default stateReducer(initialState, handlers);
