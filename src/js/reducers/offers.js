import { stateReducer } from "./utils";
import {
  LOAD_OFFERS_BY_USER,
} from "../actions";

const initialState = {
  myOffers: [],
  myOffersLoaded: false
};

const handlers = {
  [LOAD_OFFERS_BY_USER]: (state, action) => ({
    myOffers: action.data,
    myOffersLoaded: true
  }),
};

export default stateReducer(initialState, handlers);
