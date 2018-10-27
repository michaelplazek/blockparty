import {
  SET_FILTER_DISTANCE,
  SET_FILTER_COIN,
  SET_FILTER,
  SET_FILTER_TYPE
} from "./";

export const setFilterDistance = data => dispatch =>
  dispatch({ type: SET_FILTER_DISTANCE, data });

export const setFilterCoin = data => dispatch =>
  dispatch({ type: SET_FILTER_COIN, data });

export const setFilterType = data => dispatch =>
  dispatch({ type: SET_FILTER_TYPE, data });

export const setFilter = () => dispatch => dispatch({ type: SET_FILTER });
