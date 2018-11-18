import { stateReducer } from "./utils";
import {
  LOAD_OFFERS_BY_USER,
  LOAD_OFFER,
  LOAD_OFFERS_BY_ASK,
  LOAD_OFFERS_BY_BID,
  UNLOAD_OFFERS
} from "../actions";
import {DEFAULT_OFFER} from "../constants/offer";

const initialState = {
  offer: DEFAULT_OFFER,
  offerLoaded: false,
  offers: [],
  offersLoaded: false,
  myOffers: [],
  myOffersLoaded: false
};

const handlers = {
  [LOAD_OFFERS_BY_USER]: (state, action) => ({
    myOffers: action.data,
    myOffersLoaded: true
  }),
  [LOAD_OFFERS_BY_ASK]: (state, action) => ({
    offers: action.data,
    offersLoaded: true
  }),
  [LOAD_OFFERS_BY_BID]: (state, action) => ({
    offers: action.data,
    offersLoaded: true
  }),
  [UNLOAD_OFFERS]: () => ({
    offers: [],
    offersLoaded: false
  }),
  [LOAD_OFFER]: (state, action) => ({
    offer: action.data,
    offerLoaded: true
  }),
};

export default stateReducer(initialState, handlers);
