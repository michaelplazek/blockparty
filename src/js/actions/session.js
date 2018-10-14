import md5 from 'md5';
import { fetchToken, sendData } from '../api/utils'
import {
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS,
    USER_FROM_TOKEN_SUCCESS,
    USER_FROM_TOKEN_FAILURE,
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
    sendData('users/login', user, 'POST').then(response => {
        const data = response.json();
        if (response.status !== 200) {
            dispatch({ type: LOG_IN_FAILURE, data })
        } else {
            setSession(data.token);
            dispatch({ type: LOG_IN_SUCCESS, data });
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
            const data = response.json();
            if (response.status !== 200) {
                dispatch({ type: REGISTER_USER_FAILURE, data });
            } else {
                console.log(data);
                setSession(data.token);
                dispatch({ type: REGISTER_USER_SUCCESS, data });
            }
        })
};

export const loadUserFromToken = () => dispatch => {
    let token = getSession();
    if(!token || token === '') return 0;

    // fetch user from token
    fetchToken(token).then(response => {
        if (!response.error) {
            const data = response.json();

            setSession(data.token);
            dispatch({ type: USER_FROM_TOKEN_SUCCESS, data });
        } else {
            removeSession();
            dispatch({ type: USER_FROM_TOKEN_FAILURE, response });

        }
    });
};

export const logoutUser = () => dispatch => {
    sendData('users/logout', undefined, 'POST').then(() => {
        removeSession();
        dispatch({ type: LOG_OUT });
    });
};

