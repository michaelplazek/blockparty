import { stateReducer } from "./utils";
import {
  SET_BID_COIN,
  SET_BID_VOLUME,
  SET_BID_PRICE,
  RESET_BID,
  SET_BID_LATITUDE,
  SET_BID_LONGITUDE,
  SET_BID_USE_CURRENT_LOCATION,
  SET_BID_CONTACT_INFO,
  SET_BID_VOLUME_IN_USD
} from "../actions";

const initialState = {
  coin: "BTC",
  volume: 0.0001,
  volumeInUSD: 0.01,
  price: 1,
  lat: 40.564714,
  lng: -105.09065,
  contactInfo: "",
  useCurrentLocation: false
};

const handlers = {
  [SET_BID_COIN]: (state, action) => ({
    coin: action.data
  }),
  [SET_BID_VOLUME]: (state, action) => ({
    volume: action.data
  }),
  [SET_BID_VOLUME_IN_USD]: (state, action) => ({
    volumeInUSD: action.data
  }),
  [SET_BID_PRICE]: (state, action) => ({
    price: action.data
  }),
  [SET_BID_LATITUDE]: (state, action) => ({
    lat: action.data
  }),
  [SET_BID_LONGITUDE]: (state, action) => ({
    lng: action.data
  }),
  [SET_BID_USE_CURRENT_LOCATION]: (state, action) => ({
    useCurrentLocation: action.data
  }),
  [SET_BID_CONTACT_INFO]: (state, action) => ({
    contactInfo: action.data
  }),
  [RESET_BID]: () => ({ ...initialState })
};

export default stateReducer(initialState, handlers);
