import {
  LOAD_NAV_HEIGHT,
  LOAD_HEADER_HEIGHT,
  LOAD_WINDOW_HEIGHT,
  LOAD_WINDOW_WIDTH,
  SET_MARKET_VIEW,
  SET_SW_REGISTRATION,
  SET_SUBSCRIBED,
} from "./index";

export const setNavHeight = data => dispatch =>
  dispatch({ type: LOAD_NAV_HEIGHT, data });

export const setHeaderHeight = data => dispatch =>
  dispatch({ type: LOAD_HEADER_HEIGHT, data });

export const setWindowHeight = data => dispatch =>
  dispatch({ type: LOAD_WINDOW_HEIGHT, data });

export const setWindowWidth = data => dispatch =>
  dispatch({ type: LOAD_WINDOW_WIDTH, data });

export const setMarketView = data => dispatch =>
  dispatch({ type: SET_MARKET_VIEW, data });

export const setSubscribed = data => dispatch =>
  dispatch({ type: SET_SUBSCRIBED, data });

export const setSwRegistration = data => dispatch =>
  dispatch({ type: SET_SW_REGISTRATION, data });