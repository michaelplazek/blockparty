import React from 'react';
import { Box, Heading, Paragraph, Text, Button } from 'grommet';
import PropTypes from 'prop-types';

const NavItem = ({ item }) => (
    <Box
        fill={true}
        border={{color: 'light-1'}}
        responsive={true}
    >
    <Button
        href={item.path}
        hoverIndicator={{ color: 'light-1' }}
    >
        <Box
            fill='horizontal'
            flex='grow'
            direction='column'
            pad='medium'
            background='dark-1'
        >
            <Box align='center'>
                {item.icon}
            </Box>
            <Box align='center'>
                <Text size='small'>{item.label}</Text>
            </Box>
        </Box>
    </Button>
    </Box>
);

NavItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default NavItem;