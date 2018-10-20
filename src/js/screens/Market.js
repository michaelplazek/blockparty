import React, { Component } from 'react';
import { compose, lifecycle } from 'recompose';
import mapper from "../utils/connect";

import { selectHeaderHeight, selectNavHeight, selectPostsForDisplay } from "../selectors";
import { loadPosts as loadPostsAction } from "../actions/posts";

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
			return (
				<div>
					<PageHeader/>
					<GoogleMapsWrapper height={this.state.height - this.props.navHeight - this.props.headerHeight}/>
				</div>
			)
		}
};

const propMap = {
	posts: selectPostsForDisplay,
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