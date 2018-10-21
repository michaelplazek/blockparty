import { SET_FILTER_DISTANCE, SET_FILTER_COIN, SET_FILTER } from "./";

export const setFilterDistance = data => dispatch =>
	dispatch({ type: SET_FILTER_DISTANCE, data });

export const setFilterCoin = data => dispatch =>
	dispatch({ type: SET_FILTER_COIN, data });

export const setFilter = () => dispatch =>
	dispatch({ type: SET_FILTER });