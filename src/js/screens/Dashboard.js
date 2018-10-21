import React from 'react';
import { compose } from'recompose';
import mapper from "../utils/connect";

import { logOutUser as logOutUserAction } from "../actions/session";
import PageHeader from "../components/PageHeader";
import AddCircle from '@material-ui/icons/AddCircle'
import MailIcon from '@material-ui/icons/Mail';

const Dashboard = ({ logOut }) => (
	<div>
		<PageHeader
			leftHandLabel='Post'
			leftHandIcon={<AddCircle />}
			rightHandLabel='Inbox'
      rightHandIcon={<MailIcon />}
		/>
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