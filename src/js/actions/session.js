import md5 from 'md5';
import { fetchToken, sendData } from '../api/utils'
import {
    LOG_IN,
    LOG_OUT,
    REGISTER_USER,
    USER_FROM_TOKEN,
} from "./index";

const setSession = token =>
    window.sessionStorage.setItem('session', token);

export const getSession = () =>
    window.sessionStorage.getItem('session');

const removeSession = () =>
    window.sessionStorage.removeItem('session');

export const logInUser = (email, password) => dispatch => {
    const user = {
      email,
      password: md5(md5(password)),
    };
    sendData('users/login', user, 'POST')
        .then(response => {
            setSession(response.token);
            dispatch({ type: LOG_IN, data: response });
        })
};

export const registerUser = (email, password) => dispatch => {
    const user = {
        email,
        password: md5(md5(password)),
    };
    sendData('users/signup', user, 'POST')
        .then(response => {
            setSession(response.token);
            dispatch({ type: REGISTER_USER, data: response });
        })
};

export const loadUserFromToken = () => dispatch => {
    let token = getSession();
    if(!token || token === '') return 0;

    // fetch user from token
    fetchToken(token).then(response => {
        if (!response.error) {
            setSession(data.token);
            dispatch({ type: USER_FROM_TOKEN, data });
        } else {
            removeSession();
        }
    });
};

export const logoutUser = () => dispatch => {
    sendData('users/logout', undefined, 'POST').then(() => {
        removeSession();
        dispatch({ type: LOG_OUT });
    });
};

