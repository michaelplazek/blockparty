import React from 'react';
import { Box, Heading, Paragraph } from 'grommet';
import { Btc } from 'react-cryptocoins';
import PropTypes from 'prop-types';

const ListItem = ({ item }) => (
    <Box>
        <Btc />
        <Box>
            <Heading>{item.amount}</Heading>
            <Paragraph>{`at ${item.price}`}</Paragraph>
        </Box>
        <Box>

        </Box>
    </Box>
);

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ListItem;