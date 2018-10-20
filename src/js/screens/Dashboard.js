import React from 'react';
import { compose } from'recompose';
import mapper from "../utils/connect";

import { logOutUser as logOutUserAction } from "../actions/session";

const Dashboard = ({ logOut }) => (
    <div>
        <button onClick={logOut}>LOG OUT</button>
    </div>
);

const propMap = {

};

const actionMap = {
  logOut: logOutUserAction,
};

export default compose(
    mapper(propMap, actionMap),
)(Dashboard);