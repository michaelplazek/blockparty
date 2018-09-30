import React from 'react';
import { Box, Button, Anchor } from 'grommet';
import PropTypes from 'prop-types';
import Navigation from "../Navigation";

import navigation from '../../config/navigation';

const NavigationFlyout = () => (
    <Box>
        <Navigation />
        <Box justify='start' background='light-1'>
            {navigation.map(item =>
                <Box pad='medium' margin='none'>
                    <Button
                        color='neutral-1'
                        // primary={true}
                        plain={true}
                        href={item.path}
                        label={item.label}
                        key={item.index}
                    />
                </Box>
            )}
        </Box>
    </Box>
);

NavigationFlyout.propTypes = {
};

export default NavigationFlyout;