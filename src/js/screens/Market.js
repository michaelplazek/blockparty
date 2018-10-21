import React, { Component } from 'react';
import { compose, lifecycle } from 'recompose';
import mapper from "../utils/connect";

import { selectHeaderHeight, selectMapMarkers, selectNavHeight, selectPostsForDisplay } from "../selectors";
import { loadPosts as loadPostsAction } from "../actions/posts";

import FilterListIcon from '@material-ui/icons/FilterList'

import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";
import PageHeader from "../components/PageHeader";

class Market extends Component {
	constructor(props){
		super(props);

		this.state = {
			height: window.innerHeight
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
		this.setState({height: window.innerHeight});
	}

		render() {

		const { markers, navHeight, headerHeight } = this.props;

			return (
				<div>
					<PageHeader
						leftHandLabel='Filter'
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