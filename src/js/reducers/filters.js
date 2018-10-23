import { stateReducer } from "./utils";
import { SET_FILTER_DISTANCE, SET_FILTER_COIN, SET_FILTER } from "../actions";
import { DEFAULT_FILTER } from "../constants/filter";

const initialState = {
	distanceAway: 25,
	coin: 'BTC',
	filter: DEFAULT_FILTER
};

const handlers = {
	[SET_FILTER_DISTANCE]: (_, action) => ({
		distanceAway: action.data,
	}),
	[SET_FILTER_COIN]: (_, action) => ({
		coin: action.data,
	}),
	[SET_FILTER]: (state) => ({
		filter: { coin: state.coin, distanceAway: state.distanceAway },
	}),
};

export default stateReducer(initialState, handlers);