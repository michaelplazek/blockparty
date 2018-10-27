import { stateReducer } from "./utils";
import {
  LOAD_BIDS,
  LOAD_BID,
  CREATE_BID,
  UNLOAD_BID,
  UNLOAD_BIDS,
	LOAD_MY_BIDS
} from "../actions";
import { DEFAULT_BID } from "../constants/bid";

const initialState = {
  bids: [],
  bid: DEFAULT_BID,
  bidsLoaded: false,
  bidLoaded: false,
	myBids: [],
	myBidsLoaded: false,
};

const handlers = {
  [LOAD_BIDS]: (state, action) => ({
    bids: action.data,
    bidsLoaded: true
  }),
	[LOAD_MY_BIDS]: (state, action) => ({
		myBids: action.data,
		myBidsLoaded: true
	}),
  [UNLOAD_BIDS]: () => ({
    bids: initialState.asks,
    bidsLoaded: false
  }),
  [LOAD_BID]: (state, action) => ({
    bid: action.data,
    bidLoaded: true
  }),
  [UNLOAD_BID]: () => ({
    bid: initialState.ask,
    bidLoaded: false
  }),
  [CREATE_BID]: (state, action) => ({
    bid: action.data,
    bidLoaded: true
  })
};

export default stateReducer(initialState, handlers);
