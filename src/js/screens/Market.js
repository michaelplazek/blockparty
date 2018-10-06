import React from 'react';
import { Box } from 'grommet';
import { compose, lifecycle } from 'recompose';
import mapper from "../utils/connect";

import { selectPostsForDisplay} from "../selectors";
import { loadPosts as loadPostsAction } from "../actions/posts";

import List from "../components/List";
import PageHeader from '../components/PageHeader';
import Taskbar from "../components/Taskbar";
// import Grid from "@material-ui/core/Grid/Grid";

const Market = ({ posts }) => (
    <div
        // fill={true}
        // responsive={true}
    >
        {/*<PageHeader title='Marketplace'/>*/}
        <List items={posts} />
    </div>
);

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