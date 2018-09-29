import React from 'react';
import { Box } from 'grommet';
import PropTypes from 'prop-types';

import ListItem from "./ListItem";

const List = ({ items }) => (
    <Box>
        {items.map(item =>
            <ListItem
                item={item}
                key={`${item.owner}-${item.timestamp}`}
            />
        )}
    </Box>
);

List.propTypes = {
  items: PropTypes.array.isRequired,
};

export default List;