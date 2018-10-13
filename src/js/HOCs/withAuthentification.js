import React, { Component } from 'react'
import { getSession } from "../utils/session";
import Login from "../screens/Login";

export default (ProtectedRoute) => {
    class AuthHOC extends Component {

        constructor(props) {
            super(props);
        };

        render () {

            if (!getSession()) {
                return <Login />
            }
            return (
                <ProtectedRoute
                    {...this.props}
                />
            )
        }
    }

    return AuthHOC
};