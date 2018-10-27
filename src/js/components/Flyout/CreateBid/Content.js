import React from "react";
import { compose } from 'recompose';

import FormControl from "@material-ui/core/FormControl/FormControl";
import Select from "@material-ui/core/Select/Select";
import coins from "../../../constants/coins";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import { selectBidCoin, selectBidPrice, selectBidVolume } from "../../../selectors";
import mapper from "../../../utils/connect";
import {
	setBidCoin as setBidCoinAction,
	setBidPrice as setBidPriceAction,
	setBidVolume as setBidVolumeAction,
} from "../../../actions/createBid";

const CreateAskContent = ({
														index,
														coin,
														volume,
														price,
														setBidCoin,
														setBidPrice,
														setBidVolume,
													}) => {
	switch(index) {
		case 0:
			return (
				<FormControl margin='dense' fullWidth={true}>
					<Select
						variant='outlined'
						native
						value={coin}
						onChange={({target}) => setBidCoin(target.value)}
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
						onChange={({target}) => setBidVolume(target.value)}
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
						onChange={({target}) => setBidPrice(target.value)}
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
	coin: selectBidCoin,
	volume: selectBidVolume,
	price: selectBidPrice,
};

const actionMap = {
	setBidCoin: setBidCoinAction,
	setBidVolume: setBidVolumeAction,
	setBidPrice: setBidPriceAction,
};

export default compose(
	mapper(propMap, actionMap),
)(CreateAskContent);