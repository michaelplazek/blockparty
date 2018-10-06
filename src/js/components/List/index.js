import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';

import ListItem from "./ListItem";
import Placeholder from'./Placeholder';
import List from "@material-ui/core/List/List";
import {loadPostDetails} from "../../actions/posts";
import mapper from "../../utils/connect";

const ListBase = ({ items, loadPostDetails }) => (
    <div>
        {items.length > 0 &&
            <List>
                {items.map(item =>
                    <ListItem
                        item={item}
                        onClick={loadPostDetails}
                        path='/details'
                        key={item._id}
                    />
                )}
            </List>
        }
        {(items.length < 1) &&
            <Placeholder />
        }
    </div>
);

ListBase.propTypes = {
  items: PropTypes.array.isRequired,
};

const propMap = {

};

const actionMap = {
    loadPostDetails: loadPostDetails,
};

export default compose(
    mapper(propMap, actionMap),
)(ListBase);