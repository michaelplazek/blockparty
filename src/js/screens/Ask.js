import React from 'react';
import { compose } from 'recompose'
import { withRouter } from 'react-router';
import mapper from "../utils/connect";


const Ask = () => (
    <div>
        Ask
    </div>
);

const propMap = {

};

const actionMap = {

};

export default compose(
	withRouter,
	mapper(propMap, actionMap),
)(Ask);