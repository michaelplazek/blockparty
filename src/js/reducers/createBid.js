import { stateReducer } from "./utils";
import {
  SET_BID_COIN,
  SET_BID_VOLUME,
  SET_BID_PRICE,
  RESET_BID
} from "../actions";

const initialState = {
  coin: "BTC",
  volume: 0,
  price: 0
};

const handlers = {
  [SET_BID_COIN]: (state, action) => ({
    coin: action.data
  }),
  [SET_BID_VOLUME]: (state, action) => ({
    volume: action.data
  }),
  [SET_BID_PRICE]: (state, action) => ({
    price: action.data
  }),
  [RESET_BID]: () => ({ ...initialState })
};

export default stateReducer(initialState, handlers);
