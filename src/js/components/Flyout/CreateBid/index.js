import React from 'react';
import { compose, withHandlers, withState } from 'recompose';
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Flyout from '../index';

import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import Stepper from "@material-ui/core/Stepper/Stepper";
import { STEPS } from "./constants";
import Step from "@material-ui/core/Step/Step";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import StepContent from "@material-ui/core/StepContent/StepContent";
import Content from "./Content";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";

import {
	selectBidCoin,
	selectBidPrice,
	selectBidVolume,
	selectUsername
} from "../../../selectors";
import { createBid as createBidAction } from "../../../actions/bids";
import {setLayerOpen as setLayerOpenAction} from "../../../actions/layers";
import {resetBid as resetBidAction} from "../../../actions/createBid";

const styles = theme => ({
	root: {
		margin: '30px',
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	actionsContainer: {
		marginBottom: theme.spacing.unit * 2,
	},
	resetContainer: {
		padding: theme.spacing.unit * 3,
	},
});

const CreateBid = ({
										 classes,
										 onSubmit,
										 activeIndex,
										 setActiveIndex,
										 handleBack,
										 handleNext,
										 resetBid
									 }) => (
	<Flyout
		onClose={() => {
			resetBid();
			setActiveIndex(0);
		}}
		size={8}
	>
		<Grid className={classes.root}>
			<Stepper activeStep={activeIndex} orientation="vertical">
				{STEPS.map((step, index) => {
					return (
						<Step key={index}>
							<StepLabel>{step}</StepLabel>
							<StepContent>
								<Content index={index}/>
								<div className={classes.actionsContainer}>
									<div>
										<Button
											disabled={activeIndex === 0}
											onClick={handleBack}
											className={classes.button}
										>
											Back
										</Button>
										<Button
											variant="contained"
											color="primary"
											onClick={handleNext}
											className={classes.button}
										>
											{activeIndex === STEPS.length - 1 ? 'Finish' : 'Next'}
										</Button>
									</div>
								</div>
							</StepContent>
						</Step>
					)
				})}
			</Stepper>
			{activeIndex === STEPS.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					<Typography>Bid successfully created.</Typography>
				</Paper>
			)}
		</Grid>
	</Flyout>
);

const propMap = {
	coin: selectBidCoin,
	volume: selectBidVolume,
	price: selectBidPrice,
	username: selectUsername
};

const actionMap = {
	createBid: createBidAction,
	setLayerOpen: setLayerOpenAction,
	resetBid: resetBidAction
};

export default compose(
	mapper(propMap, actionMap),
	withStyles(styles),
	withState('activeIndex', 'setActiveIndex', 0),
	withHandlers({
		handleSubmit: ({
										 coin,
										 volume,
										 price,
										 username,
										 createBid,
										 setLayerOpen,
										 resetBid,
										 setActiveIndex
									 }) => () => {

			let coords;
			// TODO: handle cases where user doesnt allow location tracking
			if (navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos) => {
					coords = pos.coords;

					const bid = {
						coin,
						volume,
						price,
						owner: username,
						lat: coords.latitude,
						lng: coords.longitude,
					};

					createBid(bid);
					setTimeout(() => {
						setLayerOpen(false);
						setActiveIndex(0);
					}, 1500);
					resetBid();
				})
			}
		},
	}),
	withHandlers({
		handleBack: ({ activeIndex, setActiveIndex }) => () => {
			setActiveIndex(activeIndex - 1);
		},
		handleNext: ({ activeIndex, setActiveIndex, handleSubmit }) => () => {
			setActiveIndex(activeIndex + 1);
			if(activeIndex === STEPS.length - 1) {
				handleSubmit();
			}
		},
	})
)(CreateBid);