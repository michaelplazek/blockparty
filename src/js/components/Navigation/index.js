import React from 'react';
import { Box, Button, Anchor } from 'grommet';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Menu } from 'grommet-icons';
import {selectLayer} from "../../selectors";
import { setLayer as setLayerAction } from "../../actions/layers";
import mapper from "../../utils/connect";

const Navigation = ({ items, handleMenuSelect }) => (
    <Box basis='full' align='start' justify='between' direction='row' background='light-3'>
        <Button
            icon={<Menu />}
            onClick={handleMenuSelect}
        />
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