import {
  SET_OFFER_VOLUME,
  SET_CONTACT_INFO,
  RESET_OFFER,
  SET_OFFER_VOLUME_IN_USD
} from "./index";

export const setOfferVolume = data => dispatch =>
  dispatch({ type: SET_OFFER_VOLUME, data });

export const setOfferVolumeInUSD = data => dispatch =>
  dispatch({ type: SET_OFFER_VOLUME_IN_USD, data });

export const setContactInfo = data => dispatch =>
  dispatch({ type: SET_CONTACT_INFO, data });

export const resetOffer = () => dispatch => dispatch({ type: RESET_OFFER });
