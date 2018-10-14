import { LOAD_POSTS, LOAD_POST_DETAILS } from "./index";
import { getData } from '../api/utils'

export const loadPosts = () => dispatch =>
    getData('posts').then(response => {
        dispatch({ type: LOAD_POSTS, data: response })
    });

export const loadPostDetails = id => dispatch =>
    dispatch({ type: LOAD_POST_DETAILS, id });
