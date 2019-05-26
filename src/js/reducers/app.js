import { stateReducer } from "./utils";
import {
  LOAD_NAV_HEIGHT,
  LOAD_HEADER_HEIGHT,
  LOAD_WINDOW_HEIGHT,
  LOAD_WINDOW_WIDTH,
  SET_MARKET_VIEW,
  SET_SW_REGISTRATION,
  SET_SUBSCRIBED,
} from "../actions";
import { MAP } from "../constants/app";

const initialState = {
  navigationBarHeight: 0,
  headerHeight: 0,
  windowHeight: 0,
  windowWidth: 0,
  marketView: MAP,
  notifications: {
    swReg: null,
    isSubscribed: false,
  },
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
  [SET_SUBSCRIBED]: (state, action) => ({
    notifications: {
      ...state.notifications,
      isSubscribed: action.data,
    }
  }),
  [SET_SW_REGISTRATION]: (_, action) => ({
    notifications: {
      ...state.notifications,
      swReg: action.data,
    }
  }),
};

export default stateReducer(initialState, handlers);
