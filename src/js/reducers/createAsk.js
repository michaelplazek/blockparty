import { stateReducer } from "./utils";
import {
  SET_ASK_COIN,
  SET_ASK_VOLUME,
  SET_ASK_PRICE,
  RESET_ASK
} from "../actions";

const initialState = {
  coin: "BTC",
  volume: 0,
  price: 0
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
  [RESET_ASK]: () => ({ ...initialState })
};

export default stateReducer(initialState, handlers);
