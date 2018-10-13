import md5 from 'md5';
import { sendData } from '../api/utils'
import includes from "lodash/includes";
import { LOG_IN, LOG_OUT } from "../actions";

const setSession = id =>
    window.sessionStorage.setItem('session', id);

export const getSession = () =>
    window.sessionStorage.getItem('session');

const removeSession = () =>
    window.sessionStorage.removeItem('session');

export const logInUser = (email, password) => dispatch => {
    const user = {
      email,
      password // md5(md5(password)),
    };
    sendData('login', user, 'POST').then(data => {
        const isValid = includes(data, email);
        if (isValid) {
            setSession(data._id);
            dispatch({ type: LOG_IN, data: data.email });
        } else {
            console.error('Unknown username or password');
        }
    });
};

export const logoutUser = () => dispatch => {
    sendData('logout', undefined, 'POST').then(() => {
        removeSession();
        dispatch({ type: LOG_OUT });

        console.log('Successfully logged out.')
    });
};

