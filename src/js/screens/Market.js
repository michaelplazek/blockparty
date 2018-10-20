import React, { Component } from 'react';
import { compose, lifecycle } from 'recompose';
import mapper from "../utils/connect";

import { selectPostsForDisplay} from "../selectors";
import { loadPosts as loadPostsAction } from "../actions/posts";

import GoogleMapsWrapper from "../components/GoogleMaps/GoogleMapsWrapper";

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
				<div style={{ position: 'relative', bottom: 0 }}>
					<GoogleMapsWrapper height={this.state.height}/>
				</div>
			)
		}
};

const propMap = {
    posts: selectPostsForDisplay,
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