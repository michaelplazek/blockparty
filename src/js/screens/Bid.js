import React from "react";
import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router";
import mapper from "../utils/connect";
import {
	selectBid,
	selectBidLoaded,
	selectNavHeight,
	selectWindowHeight
} from "../selectors";
import { loadBid as loadBidAction } from "../actions/bids";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import coins from "../constants/coins";
import TextField from "@material-ui/core/TextField/TextField";
import Slider from "@material-ui/lab/Slider";

import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const styles = () => ({
	root: {
		textAlign: "center",
		marginTop: "60px"
	},
	body: {
		marginTop: "10px"
	},
	slider: {
		alignContent: "center",
		margin: "20px 60px 20px 60px"
	},
	buttons: {
		position: "absolute",
		bottom: "8em",
		right: "2em"
	},
});

const Bid = ({ bid, history, windowHeight, footerHeight, classes, loaded }) => (
	<div>
		{loaded &&
		<div>
			<Grid>
				<Button onClick={() => history.goBack()}>Go Back</Button>
				<div className={classes.root}>
					<Grid item className={classes.body}>
						<Typography variant="display2">
							{bid.volume} {bid.coin}
						</Typography>
					</Grid>
					{/*<div className={classes.slider}>*/}
					{/*<Slider*/}
					{/*value={10}*/}
					{/*aria-labelledby="label"*/}
					{/*vertical={false}*/}
					{/*min={0}*/}
					{/*max={100}*/}
					{/*/>*/}
					{/*</div>*/}
					<br/>
					<List>
						<ListItem
							divider={true}
						>
							<ListItemText>
								Location
							</ListItemText>
							<ListItemText>
								{bid.lat},{bid.lng}
							</ListItemText>
						</ListItem>
						<ListItem
							divider={true}
						>
							<ListItemText>
								Price
							</ListItemText>
							<ListItemText>
								{bid.price}
							</ListItemText>
						</ListItem>
						<ListItem
							divider={true}
						>
							<ListItemText>
								Buyer
							</ListItemText>
							<ListItemText>
								{bid._id}
							</ListItemText>
						</ListItem>
						<ListItem
							divider={true}
						>
							<ListItemText>
								Last Updated
							</ListItemText>
							<ListItemText>
								{bid.timestamp}
							</ListItemText>
						</ListItem>
					</List>
				</div>

				<Button
					className={classes.buttons}
					variant="extendedFab"
					onClick={() => {}}
				>
					Contact buyer
				</Button>
			</Grid>
			<Grid/>
		</div>
		}
	</div>

);

const propMap = {
	bid: selectBid,
	windowHeight: selectWindowHeight,
	footerHeight: selectNavHeight,
	loaded: selectBidLoaded,
};

const actionMap = {
	loadBid: loadBidAction
};

export default compose(
	withRouter,
	withStyles(styles),
	mapper(propMap, actionMap),
	lifecycle({
		componentDidMount() {
			const { search } = this.props.location;
			const id = search.substr(1);
			this.props.loadBid(id);
		}
	})
)(Bid);