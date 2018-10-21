import md5 from 'md5';
import { fetchToken, sendData } from '../api/utils'
import {
    LOG_IN,
    LOG_OUT,
    REGISTER_USER,
    USER_FROM_TOKEN,
    SESSION_LOAD,
} from "./index";

const setSession = token =>
    window.sessionStorage.setItem('session', token);

export const getSession = () =>
    window.sessionStorage.getItem('session');

const removeSession = () =>
    window.sessionStorage.removeItem('session');

export const logInUser = (username, password, history) => dispatch => {
    const user = {
			username,
      password: md5(md5(password)),
    };
    sendData('users/login', user, 'POST')
        .then(response => {
            setSession(response.token);
            dispatch({ type: LOG_IN, data: response });
        })
        .then(() => dispatch({ type: SESSION_LOAD }))
        .then(() => history.push('/'))
};

export const registerUser = (username, password, history) => dispatch => {
    const user = {
			username,
      password: md5(md5(password)),
    };
    sendData('users/signup', user, 'POST')
        .then(response => {
            setSession(response.token);
            dispatch({ type: REGISTER_USER, data: response });
        })
        .then(() => dispatch({ type: SESSION_LOAD }))
        .then(() => history.push('/'))
};

export const loadUserFromToken = () => dispatch => {
    let token = getSession();
    if(!token || token === '') return 0;

    // fetch user from token
    fetchToken(token)
        .then(response => {
            if (response) {
                setSession(response.token);
                dispatch({ type: USER_FROM_TOKEN, data: response });
            } else {
                removeSession();
            }
        })
        .then(() => dispatch({ type: SESSION_LOAD }))
};

export const logOutUser = () => dispatch => {
    sendData('users/logout', undefined, 'POST').then(() => {
        removeSession();
        dispatch({ type: LOG_OUT });
    });
};

