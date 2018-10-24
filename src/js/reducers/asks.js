import { stateReducer } from "./utils";
import {
	LOAD_ASKS,
	LOAD_ASK,
	LOAD_ASK_FROM_ASKS,
	CREATE_ASK,
	UNLOAD_ASK,
	UNLOAD_ASKS,
} from "../actions";
import { DEFAULT_ASK } from "../constants/ask";

const initialState = {
    asks: [],
    ask: DEFAULT_ASK,
    asksLoaded: false,
    askLoaded: false,
};

const handlers = {
	[LOAD_ASKS]: (state, action) => ({
		asks: action.data,
		asksLoaded: true
	}),
	[UNLOAD_ASKS]: () => ({
		asks: initialState.asks,
		asksLoaded: false
	}),
	[LOAD_ASK]: (state, action) => ({
		ask: action.data,
		askLoaded: true
	}),
	[UNLOAD_ASK]: () => ({
		ask: initialState.ask,
		askLoaded: false
	}),
	[LOAD_ASK_FROM_ASKS]: (state, action) => ({
		ask: state.asks.find(x => x._id === action.id),
	}),
	[CREATE_ASK]: (state, action) => ({
		ask: action.data,
		askLoaded: true
	}),
};

export default stateReducer(initialState, handlers);

