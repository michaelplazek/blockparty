import React from 'react';
import { compose } from 'recompose'
import { withRouter } from 'react-router';
import mapper from "../utils/connect";
import {selectAsk, selectNavHeight, selectWindowHeight} from "../selectors";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";


const Ask = ({
	ask,
	history,
	windowHeight,
	footerHeight
}) => (
    <div>
			<Grid>
				<Button
					onClick={() => history.goBack()}
				>
					Go Back
				</Button>
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
	mapper(propMap, actionMap),
)(Ask);