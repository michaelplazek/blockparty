import React from 'react';
import PropTypes from "prop-types";

import { compose, lifecycle } from 'recompose';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from '@material-ui/core/Paper/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

const styles = () => ({
	root: {
		margin: '30px 60px 30px 60px',
		padding: '20px',
	}
});

const Tile = ({ classes, title, count}) => (
	<div>
		<Paper className={classes.root} elevation={1}>
			<Grid container justify='space-between' direction='row'>
				<Grid item>
					<Typography variant='title'>{title}</Typography>
				</Grid>
				<Grid item>
					<Typography color='textSecondary' variant='subtitle'>{count}</Typography>
				</Grid>
			</Grid>
		</Paper>
	</div>
);

Tile.propTypes = {
	title: PropTypes.string,
	count: PropTypes.number,
};

export default compose(
	withStyles(styles)
)(Tile);