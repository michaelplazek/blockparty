import { stateReducer } from "./utils";
import { LOAD_NAV_HEIGHT, LOAD_HEADER_HEIGHT, LOAD_WINDOW_HEIGHT, LOAD_WINDOW_WIDTH } from "../actions";

const initialState = {
	navigationBarHeight: 0,
	headerHeight: 0,
	windowHeight: 0,
	windowWidth: 0,
};

const handlers = {
	[LOAD_NAV_HEIGHT]: (_, action) => ({
		navigationBarHeight: action.data,
	}),
	[LOAD_HEADER_HEIGHT]: (_, action) => ({
		headerHeight: action.data,
	}),
	[LOAD_WINDOW_HEIGHT]: (_, action) => ({
		windowHeight: action.data,
	}),
	[LOAD_WINDOW_WIDTH]: (_, action) => ({
		windowWidth: action.data,
	}),
};

export default stateReducer(initialState, handlers);