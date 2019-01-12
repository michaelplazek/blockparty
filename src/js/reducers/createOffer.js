import { stateReducer } from "./utils";
import {
  SET_OFFER_VOLUME,
  SET_CONTACT_INFO,
  RESET_OFFER,
  SET_OFFER_VOLUME_IN_USD
} from "../actions";

const initialState = {
  volume: 0.0001,
  volumeInUSD: 0.01,
  contactInfo: ""
};

const handlers = {
  [SET_OFFER_VOLUME]: (state, action) => ({
    volume: action.data
  }),
  [SET_OFFER_VOLUME_IN_USD]: (state, action) => ({
    volumeInUSD: action.data
  }),
  [SET_CONTACT_INFO]: (state, action) => ({
    contactInfo: action.data
  }),
  [RESET_OFFER]: () => ({ ...initialState })
};

export default stateReducer(initialState, handlers);
