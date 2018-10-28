import { stateReducer } from "./utils";
import {
  SET_ASK_COIN,
  SET_ASK_VOLUME,
  SET_ASK_PRICE,
  SET_ASK_LATITUDE,
  SET_ASK_LONGITUDE,
  RESET_ASK,
  SET_ASK_USE_CURRENT_LOCATION
} from "../actions";

const initialState = {
  coin: "BTC",
  volume: 0.0001,
  price: 1,
  lat: 40.564714,
  lng: -105.09065,
  useCurrentLocation: false
};

const handlers = {
  [SET_ASK_COIN]: (state, action) => ({
    coin: action.data
  }),
  [SET_ASK_VOLUME]: (state, action) => ({
    volume: action.data
  }),
  [SET_ASK_PRICE]: (state, action) => ({
    price: action.data
  }),
  [SET_ASK_LATITUDE]: (state, action) => ({
    lat: action.data
  }),
  [SET_ASK_LONGITUDE]: (state, action) => ({
    lng: action.data
  }),
  [SET_ASK_USE_CURRENT_LOCATION]: (state, action) => ({
    useCurrentLocation: action.data
  }),
  [RESET_ASK]: () => ({ ...initialState })
};

export default stateReducer(initialState, handlers);
