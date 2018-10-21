import React from 'react';
import { compose } from 'recompose';
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../utils/connect";

import { selectDistanceAway } from "../../selectors";
import { setDistance as setDistanceAction } from "../../actions/filter";
import coins from '../../constants/coins';
import Flyout from './';

import Grid from "@material-ui/core/Grid/Grid";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

const styles = () => ({
	root: {
		margin: '30px',
	}
});

const FilterMap = ({ classes, distance }) => (
	<Flyout>
		<Grid className={classes.root}>
			<FormControl margin='dense' fullWidth={true}>
				<InputLabel>Coin Type</InputLabel>
				<Select
					variant='outlined'
					native
					value='ADD VALUE'
					onChange={() => {}}
				>
					{coins.map(coin => <option key={coin} value={coin}>{coin}</option>)}
				</Select>
				<br/>
				<TextField
					id='distance'
					label='Distance'
					value={distance}
					onChange={() => {}}
					margin="dense"
					variant="standard"
				/>
				<br/>
				<Button
					variant='contained'
				>
					Filter
				</Button>
			</FormControl>
		</Grid>
	</Flyout>
);

const propMap = {
	distance: selectDistanceAway
};

const actionMap = {
	setDistance: setDistanceAction
};

export default compose(
	mapper(propMap, actionMap),
	withStyles(styles)
)(FilterMap);