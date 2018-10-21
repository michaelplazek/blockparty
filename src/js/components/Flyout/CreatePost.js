import React from 'react';
import { compose, withHandlers } from 'recompose';
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../utils/connect";

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

const FilterMap = ({ classes, onSubmit }) => (
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
					id='volume'
					label='Volume'
					value='2'
					onChange={() => {}}
					margin="dense"
					variant="standard"
				/>
				<br/>
				<TextField
					id='price'
					label='Price'
					value='$4,567'
					onChange={() => {}}
					margin="dense"
					variant="standard"
				/>
				<br/>
				<Button
					onClick={onSubmit}
					variant='contained'
				>
					Create
				</Button>
			</FormControl>
		</Grid>
	</Flyout>
);

const propMap = {
};

const actionMap = {
};

export default compose(
	mapper(propMap, actionMap),
	withStyles(styles),
	withHandlers({
		onSubmit: () => () => {

		},
	})
)(FilterMap);