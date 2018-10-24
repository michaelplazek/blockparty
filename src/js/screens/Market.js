import React, { Component } from 'react';
import { compose, lifecycle } from 'recompose';
import { withRouter } from 'react-router';
import mapper from "../utils/connect";

import {
	selectHeaderHeight,
	selectMapMarkers,
	selectNavHeight,
	selectPostsForDisplay
} from "../selectors";
import { loadPosts as loadPostsAction } from "../actions/posts";
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

		const { markers, navHeight, headerHeight, windowHeight } = this.props;

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
					<GoogleMapsWrapper markers={markers} height={windowHeight - navHeight - headerHeight}/>
				</div>
			)
		}
}

const propMap = {
	posts: selectPostsForDisplay,
	markers: selectMapMarkers,
	navHeight: selectNavHeight,
	headerHeight: selectHeaderHeight,
};

const actionMap = {
	loadPosts: loadPostsAction,
	setLayerOpen: setLayerOpenAction,
};

export default compose(
    mapper(propMap, actionMap),
    withRouter,
    withDimensions,
    withHandlers({
			handleMarkerClick: ({ history }) => (marker) => {
				history.push(`/post?${marker.id}`);
			},
		}),
    lifecycle({
        componentWillMount() {
            const { loadPosts } = this.props;
            loadPosts();
        }
    }),
)(Market);