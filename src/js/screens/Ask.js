import React from 'react';
import { compose } from 'recompose'
import { withRouter } from 'react-router';
import mapper from "../utils/connect";
import {selectAsk, selectNavHeight, selectWindowHeight} from "../selectors";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import coins from "../constants/coins";
import TextField from "@material-ui/core/TextField/TextField";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
	body: {
		marginTop: '10px'
	}
});

const Ask = ({
	ask,
	history,
	windowHeight,
	footerHeight,
	classes
}) => (
    <div>
			<Grid>
				<Button
					onClick={() => history.goBack()}
				>
					Go Back
				</Button>
				<Grid
					container
					justify='center'
				>
					<Grid
						item
						className={classes.body}
					>
						<Typography variant='display2'>{ask.volume} {ask.coin}</Typography>
					</Grid>
				</Grid>
				<GoogleMapsWrapper
					markers={[{ id: ask._id, lat: ask.lat, lng: ask.lng }]}
					height={windowHeight/2 - footerHeight}
					initialCenter={{ lat: ask.lat, lng: ask.lng }}
					movable='none'
					zoomable={false}
					draggable={false}
					markersClickable={false}
					zoom={13}
					locationFromBottom={footerHeight}
					border='1px #ccc solid'
				/>
			</Grid>
			<Grid>

			</Grid>
    </div>
);

const propMap = {
	ask: selectAsk,
	windowHeight: selectWindowHeight,
	footerHeight: selectNavHeight
};

const actionMap = {

};

export default compose(
	withRouter,
	withStyles(styles),
	mapper(propMap, actionMap),
)(Ask);