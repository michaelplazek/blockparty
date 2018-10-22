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
import IconButton from "@material-ui/core/IconButton/IconButton";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
	createButton: {
		position: 'absolute',
		bottom: '8em',
		right: '2em',

	}
});

const Dashboard = ({ logOut, setLayerOpen, classes }) => (
	<div>
		<CreatePost />
		<PageHeader
			// leftHandAction={() => setLayerOpen(true)}
			leftHandLabel='Dashboard'
			// leftHandIcon={<AddCircle />}
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
		<div>
			<Button
				className={classes.createButton}
				variant='extendedFab'
				onClick={() => setLayerOpen(true)}
			>
				Create a new post
			</Button>
		</div>
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
	withStyles(styles),
	withDimensions,
)(Dashboard);