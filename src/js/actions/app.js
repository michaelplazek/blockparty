import { LOAD_NAV_HEIGHT, LOAD_HEADER_HEIGHT } from "./index";

export const setNavHeight = data => dispatch =>
		dispatch({ type: LOAD_NAV_HEIGHT, data });

export const setHeaderHeight = data => dispatch =>
	dispatch({ type: LOAD_HEADER_HEIGHT, data });
