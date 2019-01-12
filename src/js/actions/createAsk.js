import {
  SET_ASK_COIN,
  SET_ASK_VOLUME,
  SET_ASK_PRICE,
  RESET_ASK,
  SET_ASK_LATITUDE,
  SET_ASK_LONGITUDE,
  SET_ASK_USE_CURRENT_LOCATION,
  SET_ASK_CONTACT_INFO,
  SET_ASK_VOLUME_IN_USD,
} from "./index";

export const setAskCoin = data => dispatch =>
  dispatch({ type: SET_ASK_COIN, data });

export const setAskVolume = data => dispatch =>
  dispatch({ type: SET_ASK_VOLUME, data });

export const setAskVolumeInUSD = data => dispatch =>
  dispatch({ type: SET_ASK_VOLUME_IN_USD, data });

export const setAskPrice = data => dispatch =>
  dispatch({ type: SET_ASK_PRICE, data });

export const setAskLatitude = data => dispatch =>
  dispatch({ type: SET_ASK_LATITUDE, data });

export const setAskLongitude = data => dispatch =>
  dispatch({ type: SET_ASK_LONGITUDE, data });

export const setAskUseCurrentLocation = data => dispatch =>
  dispatch({ type: SET_ASK_USE_CURRENT_LOCATION, data });

export const setAskContactInfo = data => dispatch =>
  dispatch({ type: SET_ASK_CONTACT_INFO, data });

export const resetAsk = () => dispatch => dispatch({ type: RESET_ASK });
