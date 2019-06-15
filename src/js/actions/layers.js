import {SET_LAYER, OPEN_LAYER, SET_MODAL, OPEN_MODAL} from "./";

export const setLayer = data => dispatch => dispatch({ type: SET_LAYER, data });
export const setLayerOpen = data => dispatch => dispatch({ type: OPEN_LAYER, data });

export const setModal = data => dispatch => dispatch({ type: SET_MODAL, data });
export const setModalOpen = data => dispatch => dispatch({ type: OPEN_MODAL, data });
