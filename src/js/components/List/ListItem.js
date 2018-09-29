import React from 'react';
import { Box, Heading, Paragraph, Text } from 'grommet';
import { Btc } from 'react-cryptocoins';
import PropTypes from 'prop-types';

const ListItem = ({ item }) => (
    <Box direction='row'>
        <Box background='red' align='center'>
            <Btc />
        </Box>
        <Box>
            <Heading margin='none'>{item.amount}</Heading>
            <Paragraph margin='none'>{`at ${item.price}`}</Paragraph>
        </Box>
        <Box>
            <Text>{item.timestamp}</Text>
        </Box>
    </Box>
);

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ListItem;