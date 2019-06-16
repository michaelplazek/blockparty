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
} from "./index";
import { wrappedFetch } from "../api/utils";

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

export const setSubscription = data => dispatch =>
  wrappedFetch("notifications/subscribe", data, "POST").then(response => {
    dispatch({ type: SET_SUBSCRIPTION, data: response });
  });

export const getSubscription = data => dispatch =>
  wrappedFetch("notifications/subscriptions", data, "POST").then(response => {
    dispatch({ type: GET_SUBSCRIPTION, data: response });
  });

export const setNotification = data =>
  wrappedFetch("notifications/notify", data, "POST");

export const setVisited = () => dispatch => dispatch({ type: SET_VISITED });

export const setNavIndex = index => dispatch =>
  dispatch({ type: SET_NAV_INDEX, data: index });

export const setRun = run => dispatch => dispatch({ type: SET_RUN, data: run });
export const setTouched = data => dispatch => dispatch({ type: SET_TOUCHED, data });
export const setAskInfo = data => dispatch => dispatch({ type: SET_ASK_INFO, data });
export const setBidInfo = data => dispatch => dispatch({ type: SET_BID_INFO, data });
export const setListOpen = data => dispatch => dispatch({ type: SET_LIST_OPEN, data });

