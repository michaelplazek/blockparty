import { SET_LAYER } from "./";

export const setLayer = data => dispatch =>
    dispatch({ type: SET_LAYER, data });