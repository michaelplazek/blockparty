import { LOAD_POSTS, LOAD_POST_DETAILS } from "./index";
import { sendData } from '../api/utils'

export const loadPosts = () => dispatch =>
    sendData('posts').then(data => dispatch({ type: LOAD_POSTS, data }));

export const loadPostDetails = id => dispatch =>
    dispatch({ type: LOAD_POST_DETAILS, id });
