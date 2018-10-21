import { SET_LAYER, OPEN_LAYER } from "./";

export const setLayer = data => dispatch =>
    dispatch({ type: SET_LAYER, data });

export const setLayerOpen = data => dispatch =>
	dispatch({ type: OPEN_LAYER, data });