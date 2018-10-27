import {
  SET_ASK_COIN,
  SET_ASK_VOLUME,
  SET_ASK_PRICE,
  RESET_ASK
} from "./index";

export const setAskCoin = data => dispatch =>
  dispatch({ type: SET_ASK_COIN, data });

export const setAskVolume = data => dispatch =>
  dispatch({ type: SET_ASK_VOLUME, data });

export const setAskPrice = data => dispatch =>
  dispatch({ type: SET_ASK_PRICE, data });

export const resetAsk = () => dispatch => dispatch({ type: RESET_ASK });
