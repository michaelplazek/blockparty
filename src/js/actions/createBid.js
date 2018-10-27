import { SET_BID_COIN, SET_BID_VOLUME, SET_BID_PRICE, RESET_BID } from "./index";

export const setBidCoin = data => dispatch =>
	dispatch({ type: SET_BID_COIN, data });

export const setBidVolume = data => dispatch =>
	dispatch({ type: SET_BID_VOLUME, data });

export const setBidPrice = data => dispatch =>
	dispatch({ type: SET_BID_PRICE, data });

export const resetBid = () => dispatch =>
	dispatch({ type: RESET_BID });
