import React from 'react';
import { compose, lifecycle } from 'recompose';

import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip/Chip";

import { setLayerOpen as setLayerOpenAction } from "../../actions/layers";
import {selectFilter} from "../../selectors";
import mapper from "../../utils/connect";

const styles = theme => ({
	root: {
		height: '50px',
		borderBottom: '1px #CCC solid',
	},
	chip: {
		margin: theme.spacing.unit,
	}
});

const Subheader = ({ classes, filter, setLayerOpen }) => (
	<div className={classes.root}>
		<Chip
			color='primary'
			clickable={true}
			onClick={() => setLayerOpen(true)}
			label={`Type: ${filter.type}`}
			className={classes.chip}
			variant="outlined"
		/>
		<Chip
			color='primary'
			clickable={true}
			onClick={() => setLayerOpen(true)}
			label={`Coin: ${filter.coin}`}
			className={classes.chip}
			variant="outlined"
		/>
		<Chip
			color='primary'
			clickable={true}
			onClick={() => setLayerOpen(true)}
			label={`Distance: ${filter.distanceAway}`}
			className={classes.chip}
			variant="outlined"
		/>
	</div>
);

const propMap = {
	filter: selectFilter,
};

const actionMap = {
	setLayerOpen: setLayerOpenAction
};

export default compose(
	withStyles(styles),
	mapper(propMap, actionMap),
)(Subheader);