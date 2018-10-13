import { LOG_IN } from "./index";
import bcrypt from 'bcrypt';
import md5 from 'md5';
import { sendData } from '../api/utils'

const setSession = id =>
    window.sessionStorage.setItem('session', id);

const getSession = () =>
    window.sessionStorage.getItem('session');

const removeSession = () =>
    window.sessionStorage.removeItem('session');

export const logInUser = (email, password) => {
    const user = {
      email,
      password: md5(md5(password)),
    };
    sendData('login', user, 'POST').then(data => {
        if (!data.error) {
            const { session } = data.getResponseHeader('Set-Cookie');
            setSession(session);
        } else {
            console.error('Unknown username or password');
        }
    });
};

export const logoutUser = () => {
    sendData('logout', undefined, 'POST').then(() => {
        removeSession();
        console.log('Successfully logged out.')
    });
};

