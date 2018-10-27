import {
  LOAD_NAV_HEIGHT,
  LOAD_HEADER_HEIGHT,
  LOAD_WINDOW_HEIGHT,
  LOAD_WINDOW_WIDTH
} from "./index";

export const setNavHeight = data => dispatch =>
  dispatch({ type: LOAD_NAV_HEIGHT, data });

export const setHeaderHeight = data => dispatch =>
  dispatch({ type: LOAD_HEADER_HEIGHT, data });

export const setWindowHeight = data => dispatch =>
  dispatch({ type: LOAD_WINDOW_HEIGHT, data });

export const setWindowWidth = data => dispatch =>
  dispatch({ type: LOAD_WINDOW_WIDTH, data });
