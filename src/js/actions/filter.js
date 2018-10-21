import { SET_FILTER_DISTANCE } from "./";

export const setDistance = data => dispatch =>
	dispatch({ type: SET_FILTER_DISTANCE, data });
