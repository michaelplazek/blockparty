import { stateReducer } from "./utils";
import { SET_POST_COIN, SET_POST_VOLUME, SET_POST_PRICE, RESET_POST } from "../actions";

const initialState = {
	coin: 'BTC',
	volume: 0,
	price: 0,
};

const handlers = {
	[SET_POST_COIN]: (state, action) => ({
		coin: action.data,
	}),
	[SET_POST_VOLUME]: (state, action) => ({
		volume: action.data,
	}),
	[SET_POST_PRICE]: (state, action) => ({
		price: action.data,
	}),
	[RESET_POST]: () => ({ ...initialState }),
};

export default stateReducer(initialState, handlers);

