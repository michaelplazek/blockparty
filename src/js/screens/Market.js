import React, { Component } from 'react';
import { compose, lifecycle } from 'recompose';
import mapper from "../utils/connect";

import { selectHeaderHeight, selectMapMarkers, selectNavHeight, selectPostsForDisplay } from "../selectors";
import { loadPosts as loadPostsAction } from "../actions/posts";
import { setLayerOpen as setLayerOpenAction } from '../actions/layers';

import FilterListIcon from '@material-ui/icons/FilterList'

import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";
import PageHeader from "../components/PageHeader";
import FilterMap from "../components/Flyout/FilterMap";
import withWindowSize from "../HOCs/withWindowSize";

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
						leftHandLabel='Filter'
						leftHandAction={() => this.props.setLayerOpen(true)}
						leftHandIcon={<FilterListIcon />}
						rightHandButton='Go to chart view'
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
    withWindowSize,
    lifecycle({
        componentWillMount() {
            const { loadPosts } = this.props;
            loadPosts();
        }
    }),
)(Market);