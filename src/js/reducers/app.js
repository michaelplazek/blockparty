import { stateReducer } from "./utils";
import { LOAD_NAV_HEIGHT, LOAD_HEADER_HEIGHT } from "../actions";

const initialState = {
	navigationBarHeight: 0,
	headerHeight: 0,
};

const handlers = {
	[LOAD_NAV_HEIGHT]: (_, action) => ({
		navigationBarHeight: action.data,
	}),
	[LOAD_HEADER_HEIGHT]: (_, action) => ({
		headerHeight: action.data,
	}),
};

export default stateReducer(initialState, handlers);