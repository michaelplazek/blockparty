import React from 'react';
import { Box, Button, Anchor } from 'grommet';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Menu } from 'grommet-icons';
import {selectLayer} from "../../selectors";
import { setLayer as setLayerAction } from "../../actions/layers";
import mapper from "../../utils/connect";

import { headerNavigation } from '../../config/navigation';

const Navigation = ({ items, handleMenuSelect, LAYER }) => (
    <Box justify='between' direction='row' background='dark-1'>
        <Button
            icon={<Menu />}
            onClick={handleMenuSelect}
        />
        { LAYER !== 'NAVIGATION' &&
            <Box align='center' justify='center' direction='row'>
                {headerNavigation.map(item =>
                    <Box margin='small' key={item.index}>
                        <Button
                            hoverIndicator={{ color: 'dark-2' }}
                            primary={false}
                            plain={true}
                            label={item.label}
                            href={item.path}
                        />
                    </Box>
                )}
            </Box>
        }
    </Box>
);

Navigation.propTypes = {
    items: PropTypes.array,
};

const propMap = {
    LAYER: selectLayer,
};

const actionMap = {
    setLayer: setLayerAction
};

export default compose(
    mapper(propMap, actionMap),
    withHandlers({
       handleMenuSelect: ({ LAYER, setLayer }) => () => {
            if (LAYER === 'NAVIGATION') {
                setLayer('');
            } else {
                setLayer('NAVIGATION');
            }
       }
    }),
)(Navigation);