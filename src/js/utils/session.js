import md5 from 'md5';
import { fetchToken, sendData } from '../api/utils'
import includes from "lodash/includes";
import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT,
    REGISTER_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    USER_FROM_TOKEN,
    USER_FROM_TOKEN_SUCCESS,
    USER_FROM_TOKEN_FAILURE,
} from "../actions";

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
    sendData('users/login', user, 'POST').then(response => {
        if (response.status !== 200) {
            dispatch({ type: LOG_IN_FAILURE, data: response })
        } else {
            setSession(response.token);
            dispatch({ type: LOG_IN_SUCCESS, data: response });
        }
    });
};

export const registerUser = (email, password) => dispatch => {
    const user = {
        email,
        password: md5(md5(password)),
    };
    sendData('users/signup', user, 'POST')
        .then(response => {
            if (response.status !== 200) {
            } else {
                setSession(response.token);
                dispatch({ type: REGISTER_USER_SUCCESS, data: response });
            }
        })
};

export const loadUserFromToken = () => dispatch => {
    let token = getSession();
    if(!token || token === '') return 0;

    // fetch user from token
    fetchToken(token).then(response => {
        if (!response.error) {
            setSession(response.token);
            dispatch({ type: USER_FROM_TOKEN_SUCCESS, data: response });
        } else {
            removeSession();
            dispatch({ type: USER_FROM_TOKEN_FAILURE, data: response });

        }
    });
};

export const logoutUser = () => dispatch => {
    sendData('users/logout', undefined, 'POST').then(() => {
        removeSession();
        dispatch({ type: LOG_OUT });
    });
};

