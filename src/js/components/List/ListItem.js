import React from 'react';
import { Box, Heading, Paragraph, Text } from 'grommet';
import { Btc } from 'react-cryptocoins';
import PropTypes from 'prop-types';

const ListItem = ({ item }) => (
    <Box direction='row' margin='large'>
        <Box justify='center' align='center'>
            <Btc size={50}/>
        </Box>
        <Box>
            <Box>
                <Heading margin='none'>{item.amount}</Heading>
                <Paragraph margin='none'>{`at ${item.price}`}</Paragraph>
            </Box>
            <Box>
                <Text>{item.timestamp}</Text>
            </Box>
        </Box>
    </Box>
);

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ListItem;