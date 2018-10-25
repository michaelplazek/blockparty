import {
	LOAD_ASKS,
	LOAD_ASK_FROM_ASKS,
	CREATE_ASK,
	LOAD_ASK,
	UNLOAD_ASK,
	UNLOAD_ASKS,
} from "./index";
import {wrappedFetch, wrappedFetchWithParams} from '../api/utils'

export const loadAsks = () => dispatch =>
    wrappedFetch('asks').then(response => {
        dispatch({ type: LOAD_ASKS, data: response })
    });

export const unloadAsks = () => dispatch =>
	dispatch({ type: UNLOAD_ASKS });

export const loadAsk = id => dispatch =>
	wrappedFetchWithParams('ask', undefined, 'GET', `id=${id}`).then(response => {
		dispatch({ type: LOAD_ASK, data: response })
	});

export const unloadAsk = () => dispatch =>
		dispatch({ type: UNLOAD_ASK });


export const loadAskFromAsks = id => dispatch =>
    dispatch({ type: LOAD_ASK_FROM_ASKS, id });

export const createAsk = ask => dispatch =>
	wrappedFetch('asks', ask, 'POST').then(response => {
		dispatch({ type: CREATE_ASK, data: response });
	});