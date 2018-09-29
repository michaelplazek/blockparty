import React from 'react';
import { Box, Heading, Paragraph, Text } from 'grommet';
import { Btc } from 'react-cryptocoins';
import PropTypes from 'prop-types';

const ListItem = ({ item }) => (
    <Box direction='row' margin='medium'>
        <Box justify='center' align='center'>
            <Btc size={40}/>
        </Box>
        <Box margin={{ horizontal: 'medium' }}>
            <Box>
                <Heading padding='none' margin='none'>{item.amount}</Heading>
                <Paragraph
                    size='small'
                    margin='none'
                >
                    at {item.price}/{item.coin}
                </Paragraph>
            </Box>
        </Box>
        <Box margin='small'>
            <Text size='xsmall'>{item.timestamp}</Text>
        </Box>
    </Box>
);

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ListItem;