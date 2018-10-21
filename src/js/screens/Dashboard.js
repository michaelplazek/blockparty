import React from 'react';
import { compose } from'recompose';
import mapper from "../utils/connect";

import Tile from '../components/Tile';

import { logOutUser as logOutUserAction } from "../actions/session";
import { setLayerOpen as setLayerOpenAction } from "../actions/layers";

import PageHeader from "../components/PageHeader";
import AddCircle from '@material-ui/icons/AddCircle'
import MailIcon from '@material-ui/icons/Mail';
import CreatePost from "../components/Flyout/CreatePost/index";
import withDimensions from "../HOCs/withDimensions";

const Dashboard = ({ logOut, setLayerOpen }) => (
	<div>
		<CreatePost />
		<PageHeader
			leftHandAction={() => setLayerOpen(true)}
			leftHandLabel='Post'
			leftHandIcon={<AddCircle />}
			rightHandLabel='Inbox'
      rightHandIcon={<MailIcon />}
		/>
		<Tile
			title='Posts'
			count={0}
		/>
		<Tile
			title='Bids'
			count={0}
		/>
	</div>
);

const propMap = {

};

const actionMap = {
  logOut: logOutUserAction,
	setLayerOpen: setLayerOpenAction
};

export default compose(
    mapper(propMap, actionMap),
	withDimensions,
)(Dashboard);