import React from "react";
import { compose, withHandlers, withState } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../../utils/connect";

import Grid from "@material-ui/core/Grid/Grid";
import { setLayerOpen as setLayerOpenAction } from "../../../actions/layers";
import {deleteBid, loadMyBids as loadMyBidsAction} from "../../../actions/bids";
import Modal from "@material-ui/core/Modal/Modal";
import {selectBid, selectLayerOpen, selectWindowHeight, selectWindowWidth} from "../../../selectors";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";


const styles = theme => ({
	paper: {
		width: "100%",
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	button: {
		marginTop: "4px"
	}
});

const DeleteBid = ({
										 classes,
										 setLayerOpen,
										 loadMyBids,
										 windowWidth,
										 windowHeight,
										 bid,
										 open
									 }) => (
	<Modal
		onClose={() => {setLayerOpen(false)}}
		onBackdropClick={() => {setLayerOpen(false)}}
		size={8}
		open={open}
	>
		<div style={{
			position: 'absolute',
			top: `${windowHeight/3}px`,
			left: "10%",
			right: "10%",
			display: 'flex',
			justifyContent: "center",
		}} >
			<Paper className={classes.paper}>
				<Typography variant='display1'>{bid.volume}</Typography>
				<Typography variant='subheading'>at {bid.price}/{bid.coin}</Typography>
				<div className={classes.button}>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => {
							deleteBid(bid._id);
							setLayerOpen(false);
						}}
					>
						Delete
					</Button>
				</div>
			</Paper>
		</div>
	</Modal>
);

const propMap = {
	open: selectLayerOpen,
	bid: selectBid,
	windowHeight: selectWindowHeight,
	windowWidth: selectWindowWidth
};

const actionMap = {
	setLayerOpen: setLayerOpenAction,
	loadMyBids: loadMyBidsAction
};

export default compose(
	mapper(propMap, actionMap),
	withStyles(styles),
	withHandlers({

	}),
	withHandlers({

	})
)(DeleteBid);