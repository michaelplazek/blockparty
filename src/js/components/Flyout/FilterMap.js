import React from 'react';
import { compose, withHandlers } from 'recompose';
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../utils/connect";

import { selectFilter, selectFilterCoin, selectFilterDistance } from "../../selectors";
import {
	setFilterDistance as setFilterDistanceAction,
	setFilterCoin as setFilterCoinAction,
	setFilter as setFilterAction
} from "../../actions/filter";
import { setLayerOpen as setLayerOpenAction } from "../../actions/layers";
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

const FilterMap = ({
	classes,
	distance,
	coin,
	setFilterDistance,
	setFilterCoin,
	handleSubmit
}) => (
	<Flyout size={3}>
		<Grid className={classes.root}>
			<FormControl margin='dense' fullWidth={true}>
				<InputLabel>Coin Type</InputLabel>
				<Select
					variant='outlined'
					native
					value={coin}
					onChange={({ target }) => setFilterCoin(target.value)}
				>
					{coins.map(item => <option key={item} value={item}>{item}</option>)}
				</Select>
				<br/>
				<TextField
					id='distance'
					label='Distance Away'
					value={distance}
					onChange={({ target }) => setFilterDistance(target.value)}
					margin="dense"
					variant="standard"
				/>
				<br/>
				<Button
					variant='contained'
					onClick={handleSubmit}
				>
					Filter
				</Button>
			</FormControl>
		</Grid>
	</Flyout>
);

const propMap = {
	distance: selectFilterDistance,
	coin: selectFilterCoin,
	filter: selectFilter
};

const actionMap = {
	setFilterDistance: setFilterDistanceAction,
	setFilterCoin: setFilterCoinAction,
	setFilter: setFilterAction,
	setLayerOpen: setLayerOpenAction
};

export default compose(
	mapper(propMap, actionMap),
	withHandlers({
		handleSubmit: ({ setFilter, setLayerOpen }) => () => {
			setFilter();
			setLayerOpen(false);
		}
	}),
	withStyles(styles)
)(FilterMap);