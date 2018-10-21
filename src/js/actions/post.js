import { SET_POST_COIN, SET_POST_VOLUME, SET_POST_PRICE, RESET_POST } from "./index";

export const setPostCoin = data => dispatch =>
	dispatch({ type: SET_POST_COIN, data });

export const setPostVolume = data => dispatch =>
	dispatch({ type: SET_POST_VOLUME, data });

export const setPostPrice = data => dispatch =>
	dispatch({ type: SET_POST_PRICE, data });

export const resetPost = () => dispatch =>
	dispatch({ type: RESET_POST });
