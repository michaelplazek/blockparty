import { stateReducer } from "./utils";
import {
  SET_FILTER_DISTANCE,
  SET_FILTER_COIN,
  SET_FILTER,
  SET_FILTER_TYPE
} from "../actions";
import { DEFAULT_FILTER } from "../constants/filters";

const initialState = {
  distanceAway: 25,
  coin: "BTC",
  type: "ASK",
  filter: DEFAULT_FILTER
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
  })
};

export default stateReducer(initialState, handlers);
