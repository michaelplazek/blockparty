import { stateReducer } from "./utils";
import { LOAD_POSTS } from "../actions";

const initialState = {
    posts: [],
    post: {},
    postsLoaded: false,
    postLoaded: false,
};

const handlers = {
    [LOAD_POSTS]: (state, action) => ({
       posts: action.data,
    }),
};

export default stateReducer(initialState, handlers);

