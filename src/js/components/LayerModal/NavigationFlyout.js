import React from 'react';
import { Box, Button, Anchor } from 'grommet';
import PropTypes from 'prop-types';
import Navigation from "../Navigation";

const NavigationFlyout = ({ items }) => (
    <Box height='full'>
        <Navigation />
        <Box background='light-3'>

        </Box>
    </Box>
);

NavigationFlyout.propTypes = {
    items: PropTypes.array,
};

export default NavigationFlyout;