import React from 'react';
import { Box } from 'grommet';
import PropTypes from 'prop-types';

import ListItem from "./ListItem";
import Placeholder from'./Placeholder';
import Taskbar from "../Taskbar";

const List = ({ items }) => (
    <Box responsive={true}>
        {items.length > 0 &&
        <Taskbar />
        }
        {items.map(item =>
            <ListItem
                item={item}
                key={`${item._id}`}
            />
        )}
        {(items.length < 1) &&
            <Placeholder />
        }
    </Box>
);

List.propTypes = {
  items: PropTypes.array.isRequired,
};

export default List;