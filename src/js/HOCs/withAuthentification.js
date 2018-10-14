import React from 'react'
import { compose } from 'recompose';

import Login from "../screens/Login";
import mapper from "../utils/connect";
import { selectIsLoggedIn } from "../selectors";

export default (ProtectedRoute) => {
    const AuthHOC = (props) => (
        !props.loggedIn ? <Login/> : <ProtectedRoute {...props} />
    );


    const propMap = {
        loggedIn: selectIsLoggedIn,
    };

    const actionMap = {

    };

    return compose(
        mapper(propMap, actionMap)
    )(AuthHOC)
};