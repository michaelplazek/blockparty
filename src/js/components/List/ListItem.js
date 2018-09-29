import React from 'react';
import { Box, Heading, Paragraph, Text, Button } from 'grommet';
import { Link } from 'react-router-dom';
import { Btc } from 'react-cryptocoins';
import PropTypes from 'prop-types';

const ListItem = ({ item }) => (
    <Button href='/post'>
        <Box
            border={{ color: 'dark-2', side: 'bottom'}}
            justify='center' fill='horizontal'
            direction='row'
            pad='medium'
        >
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
                <Box align='end' margin='small'>
                    <Text margin='none' size='xsmall'>{item.location}</Text>
                    <Text margin='none' size='xsmall'>{item.timestamp}</Text>
                </Box>
        </Box>
    </Button>
);

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default ListItem;