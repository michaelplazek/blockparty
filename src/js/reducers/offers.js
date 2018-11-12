import { stateReducer } from "./utils";
import {
  LOAD_OFFERS_BY_USER,
  LOAD_OFFER,
} from "../actions";
import {DEFAULT_OFFER} from "../constants/offer";

const initialState = {
  offer: DEFAULT_OFFER,
  offerLoaded: false,
  myOffers: [],
  myOffersLoaded: false
};

const handlers = {
  [LOAD_OFFERS_BY_USER]: (state, action) => ({
    myOffers: action.data,
    myOffersLoaded: true
  }),
  [LOAD_OFFER]: (state, action) => ({
    offer: action.data,
    offerLoaded: true
  }),
};

export default stateReducer(initialState, handlers);
