import React, { Component } from 'react';
import { compose, lifecycle } from 'recompose';
import mapper from "../utils/connect";

import { selectHeaderHeight, selectMapMarkers, selectNavHeight, selectPostsForDisplay } from "../selectors";
import { loadPosts as loadPostsAction } from "../actions/posts";
import { setLayerOpen as setLayerOpenAction } from '../actions/layers';
import { setWindowHeight as setWindowHeightAction, setWindowWidth as setWindowWidthAction } from "../actions/app";

import FilterListIcon from '@material-ui/icons/FilterList'

import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";
import PageHeader from "../components/PageHeader";
import Flyout from '../components/Flyout';
import {setLayerOpen} from "../actions/layers";
import FilterFlyout from "../components/Flyout/FilterFlyout";

class Market extends Component {
	constructor(props){
		super(props);

		this.state = {
			height: window.innerHeight,
			width: window.innerWidth,
		};

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	// get size of window for map dimensions
	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ height: window.innerHeight, width: window.innerWidth });
		this.props.setWindowHeight(window.innerHeight);
		this.props.setWindowWidth(window.innerWidth);
	}

		render() {

		const { markers, navHeight, headerHeight } = this.props;

			return (
				<div>
					<FilterFlyout />
					<PageHeader
						leftHandLabel='Filter'
						leftHandAction={() => this.props.setLayerOpen(true)}
						leftHandIcon={<FilterListIcon />}
						rightHandButton='Go to chart view'
					/>
					<GoogleMapsWrapper markers={markers} height={this.state.height - navHeight - headerHeight}/>
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
	setWindowHeight: setWindowHeightAction,
	setWindowWidth: setWindowWidthAction,
	setLayerOpen: setLayerOpenAction,
};

export default compose(
    mapper(propMap, actionMap),
    lifecycle({
        componentWillMount() {
            const { loadPosts } = this.props;
            loadPosts();
        }
    }),
)(Market);