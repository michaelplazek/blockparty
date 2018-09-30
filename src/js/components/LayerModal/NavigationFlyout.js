import React from 'react';
import { Box, Button, Anchor } from 'grommet';
import PropTypes from 'prop-types';
import Navigation from "../Navigation";

import { flyoutNavigation } from '../../config/navigation';

const NavigationFlyout = () => (
    <Box>
        <Navigation />
        <Box justify='start' background='light-1'>
            {flyoutNavigation.map(item =>
                <Box pad='medium' margin='none'>
                    <Button
                        icon={item.icon}
                        color='neutral-1'
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