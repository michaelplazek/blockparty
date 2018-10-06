import React from 'react';
import PropTypes from 'prop-types';

import ListItem from "./ListItem";
import Placeholder from'./Placeholder';
import List from "@material-ui/core/List/List";

const ListBase = ({ items }) => (
    <div>
        {items.length > 0 &&
            <List>
                {items.map(item =>
                    <ListItem
                        item={item}
                        key={`${item._id}`}
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

export default ListBase;