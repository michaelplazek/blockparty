import {
  LOAD_NAV_HEIGHT,
  LOAD_HEADER_HEIGHT,
  LOAD_WINDOW_HEIGHT,
  LOAD_WINDOW_WIDTH,
  SET_MARKET_VIEW,
  SET_SUBSCRIPTION,
  GET_SUBSCRIPTION,
  SET_VISITED,
  SET_NAV_INDEX
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
