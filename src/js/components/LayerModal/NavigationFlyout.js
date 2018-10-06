import React from 'react';
import { Box, Button, Anchor } from 'grommet';
import PropTypes from 'prop-types';
import Navigation from "../Navigation";

import { flyoutNavigation } from '../../config/navigation';

const NavigationFlyout = () => (
    <Box fill={true} background={{ color: 'light-2' }}>
        <Navigation />
        <Box justify='start' >
            {flyoutNavigation.map(item =>
                <Box
                    border={{ side: 'bottom', color: 'dark-4' }}
                    key={item.index}
                    pad={{ vertical: 'small', horizontal: 'large' }}
                    margin='none'
                >
                    <Button
                        hoverIndicator={{ color: 'light-2' }}
                        icon={item.icon}
                        color='neutral-1'
                        plain={true}
                        href={item.path}
                        label={item.label}
                    />
                </Box>
            )}
        </Box>
    </Box>
);

NavigationFlyout.propTypes = {
};

export default NavigationFlyout;