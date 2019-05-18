import { stateReducer } from "./utils";
import {
  SET_FILTER_DISTANCE,
  SET_FILTER_COIN,
  SET_FILTER,
  SET_FILTER_TYPE,
  SET_FILTER_PRICE,
  SET_FILTER_ITEMS
} from "../actions";
import { DEFAULT_FILTER } from "../constants/filters";

const initialState = {
  distanceAway: 25,
  coin: "BTC",
  type: "ALL",
  filter: DEFAULT_FILTER,
  price: undefined,
};

const handlers = {
  [SET_FILTER_DISTANCE]: (_, action) => ({
    distanceAway: action.data
  }),
  [SET_FILTER_COIN]: (_, action) => ({
    coin: action.data
  }),
  [SET_FILTER_TYPE]: (_, action) => ({
    type: action.data
  }),
  [SET_FILTER]: state => ({
    filter: {
      coin: state.coin,
      distanceAway: state.distanceAway,
      type: state.type
    }
  }),
  [SET_FILTER_ITEMS]: state => ({
    coin: state.filter.coin,
    distanceAway: state.filter.distanceAway,
    type: state.filter.type
  }),
  [SET_FILTER_PRICE]: (_, action) => ({
    price: action.data
  })
};

export default stateReducer(initialState, handlers);
