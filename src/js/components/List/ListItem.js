import React from 'react';
import { Box, Heading, Paragraph, Text, Button } from 'grommet';
import PropTypes from 'prop-types';

import { getCoinIcon } from "./utils";

const ListItem = ({ item }) => (
    <Button
        href='/post'
    >
        <Box
            border={{ color: 'light-1', side: 'bottom'}}
            justify='center' fill='horizontal'
            direction='row'
            pad='medium'
            background={{ color: 'neutral-1' }}
        >
            <Box justify='center' align='center'>
                {getCoinIcon(item.coin)}
            </Box>
            <Box margin={{ horizontal: 'medium' }}>
                <Box>
                    <Heading padding='none' margin='none'>{item.amount}</Heading>
                    <Paragraph
                        size='small'
                        margin='none'
                    >
                        {item.price}/{item.coin}
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