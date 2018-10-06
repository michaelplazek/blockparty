import React from 'react';
import { Box } from 'grommet';
import { compose, lifecycle } from 'recompose';
import mapper from "../utils/connect";

import { selectPostsForDisplay} from "../selectors";
import { loadPosts as loadPostsAction } from "../actions/posts";

import List from "../components/List";
import PageHeader from '../components/PageHeader';
import Taskbar from "../components/Taskbar";

const Market = ({ posts }) => (
    <Box
        // fill={true}
        responsive={true}
    >
        {/*<PageHeader title='Marketplace'/>*/}
        <List items={posts} />
    </Box>
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