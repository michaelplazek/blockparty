import React from "react";
import { compose } from 'recompose';

import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import coins from "../../../constants/coins";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import { selectPostCoin, selectPostPrice, selectPostVolume } from "../../../selectors";
import mapper from "../../../utils/connect";
import {
	setPostCoin as setPostCoinAction,
	setPostPrice as setPostPriceAction,
	setPostVolume as setPostVolumeAction,
} from "../../../actions/post";

const CreatePostContent = ({
	index,
	coin,
	volume,
	price,
	setPostCoin,
	setPostPrice,
	setPostVolume,
}) => {
	switch(index) {
		case 0:
			return (
				<FormControl margin='dense' fullWidth={true}>
					<Select
						variant='outlined'
						native
						value={coin}
						onChange={({target}) => setPostCoin(target.value)}
					>
						{coins.map(coin => <option key={coin} value={coin}>{coin}</option>)}
					</Select>
				</FormControl>
			);
		case 1:
			return (
				<FormControl margin='dense' fullWidth={true}>
					<TextField
						id='volume'
						value={volume}
						onChange={({target}) => setPostVolume(target.value)}
						margin="dense"
						variant="standard"
					/>
				</FormControl>
			);
		case 2:
			return (
				<FormControl margin='dense' fullWidth={true}>
					<TextField
						id='price'
						value={price}
						onChange={({target}) => setPostPrice(target.value)}
						margin="dense"
						variant="standard"
					/>
				</FormControl>
			);
		case 3:
		return (
			<Grid container direction='column'>
				<Typography>Type: {coin}</Typography>
				<Typography>Volume: {volume}</Typography>
				<Typography>Price: {price}</Typography>
			</Grid>
		)
	}
};

const propMap = {
	coin: selectPostCoin,
	volume: selectPostVolume,
	price: selectPostPrice,
};

const actionMap = {
	setPostCoin: setPostCoinAction,
	setPostVolume: setPostVolumeAction,
	setPostPrice: setPostPriceAction,
};

export default compose(
	mapper(propMap, actionMap),
)(CreatePostContent);