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

import {selectPostCoin, selectPostPrice, selectPostVolume, selectUsername} from "../../../selectors";
import { createPost as createPostAction } from "../../../actions/posts";
import {setLayerOpen as setLayerOpenAction} from "../../../actions/layers";
import {resetPost as resetPostAction} from "../../../actions/post";

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

const Index = ({
	classes,
	onSubmit,
	activeIndex,
	setActiveIndex,
	handleBack,
	handleNext,
	resetPost
}) => (
	<Flyout
		onClose={() => {
			resetPost();
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
					<Typography>Post successfully created.</Typography>
				</Paper>
			)}
		</Grid>
	</Flyout>
);

const propMap = {
	coin: selectPostCoin,
	volume: selectPostVolume,
	price: selectPostPrice,
	username: selectUsername
};

const actionMap = {
	createPost: createPostAction,
	setLayerOpen: setLayerOpenAction,
	resetPost: resetPostAction
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
			createPost,
			setLayerOpen,
			resetPost,
			setActiveIndex
		}) => () => {

			let coords;
			// TODO: handle cases where user doesnt allow location tracking
			if (navigator && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((pos) => {
					coords = pos.coords;

					const post = {
						coin,
						volume,
						price,
						owner: username,
						lat: coords.latitude,
						lng: coords.longitude,
					};

					createPost(post);
					setTimeout(() => {
						setLayerOpen(false);
						setActiveIndex(0);
					}, 1500);
					resetPost();
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
)(Index);
