import {
  SET_BID_COIN,
  SET_BID_VOLUME,
  SET_BID_PRICE,
  RESET_BID,
  SET_BID_LATITUDE,
  SET_BID_LONGITUDE,
  SET_BID_CONTACT_INFO,
  SET_BID_USE_CURRENT_LOCATION,
  SET_BID_VOLUME_IN_USD
} from "./index";

export const setBidCoin = data => dispatch =>
  dispatch({ type: SET_BID_COIN, data });

export const setBidVolume = data => dispatch =>
  dispatch({ type: SET_BID_VOLUME, data });

export const setBidVolumeInUSD = data => dispatch =>
  dispatch({ type: SET_BID_VOLUME_IN_USD, data });

export const setBidPrice = data => dispatch =>
  dispatch({ type: SET_BID_PRICE, data });

export const setBidLatitude = data => dispatch =>
  dispatch({ type: SET_BID_LATITUDE, data });

export const setBidLongitude = data => dispatch =>
  dispatch({ type: SET_BID_LONGITUDE, data });

export const setBidUseCurrentLocation = data => dispatch =>
  dispatch({ type: SET_BID_USE_CURRENT_LOCATION, data });

export const setBidContactInfo = data => dispatch =>
  dispatch({ type: SET_BID_CONTACT_INFO, data });

export const resetBid = () => dispatch => dispatch({ type: RESET_BID });
