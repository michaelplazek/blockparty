import React, { Component } from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { withRouter } from 'react-router';
import mapper from "../utils/connect";

import {
	selectHeaderHeight,
	selectMapMarkers,
	selectNavHeight,
	selectAsksForDisplay
} from "../selectors";
import {loadAskFromAsks as loadAskFromAsksAction, loadAsks as loadAsksAction} from "../actions/asks";
import { setLayerOpen as setLayerOpenAction } from '../actions/layers';

import FilterListIcon from '@material-ui/icons/FilterList'

import Subheader from "../components/Subheader";
import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";
import PageHeader from "../components/PageHeader";
import FilterMap from "../components/Flyout/FilterMap";
import withDimensions from "../HOCs/withDimensions";

class Market extends Component {
	constructor(props) {
		super(props);
	}

		render() {

		const {
			markers,
			navHeight,
			headerHeight,
			windowHeight,
			handleMarkerClick
		} = this.props;

			return (
				<div>
					<FilterMap />
					<PageHeader
						leftHandAction={() => this.props.setLayerOpen(true)}
						leftHandIcon={<FilterListIcon />}
						rightHandButton='Go to chart view'
						showSubheader={true}
						subheader={<Subheader />}
					/>
					<GoogleMapsWrapper
						markers={markers}
						onMarkerClick={handleMarkerClick}
						height={windowHeight - navHeight - headerHeight}
					/>
				</div>
			)
		}
}

const propMap = {
	posts: selectAsksForDisplay,
	markers: selectMapMarkers,
	navHeight: selectNavHeight,
	headerHeight: selectHeaderHeight,
};

const actionMap = {
	loadAsks: loadAsksAction,
	setLayerOpen: setLayerOpenAction,
	loadAskFromAsks: loadAskFromAsksAction
};

export default compose(
    mapper(propMap, actionMap),
    withRouter,
    withDimensions,
    withHandlers({
			handleMarkerClick: ({ history, loadAskFromAsks }) => (marker) => {
				const { id } = marker;
				loadAskFromAsks(id);
				history.push(`/ask?${id}`);
			},
		}),
    lifecycle({
        componentWillMount() {
            const { loadAsks } = this.props;
            loadAsks();
        }
    }),
)(Market);