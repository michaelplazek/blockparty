import React from 'react';
import { compose } from'recompose';
import mapper from "../utils/connect";

import Tile from '../components/Tile';

import { setLayerOpen as setLayerOpenAction } from "../actions/layers";

import PageHeader from "../components/PageHeader";
import MailIcon from '@material-ui/icons/Mail';
import CreateAsk from "../components/Flyout/CreateAsk/index";
import withDimensions from "../HOCs/withDimensions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
	createButton: {
		position: 'absolute',
		bottom: '8em',
		right: '2em',

	}
});

const Dashboard = ({ setLayerOpen, classes }) => (
	<div>
		<CreateAsk />
		<PageHeader
			leftHandLabel='Dashboard'
			rightHandLabel='Inbox'
      rightHandIcon={<MailIcon />}
		/>
		<Tile
			title='Asks'
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
				Create a new ask
			</Button>
		</div>
	</div>
);

const propMap = {

};

const actionMap = {
	setLayerOpen: setLayerOpenAction
};

export default compose(
	mapper(propMap, actionMap),
	withStyles(styles),
	withDimensions,
)(Dashboard);