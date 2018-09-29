import { LOAD_POSTS } from "./index";
import { getData } from '../api/utils'

export const loadPosts = () => dispatch =>
    getData('posts').then(data => dispatch({ type: LOAD_POSTS, data }));
