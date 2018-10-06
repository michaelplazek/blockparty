import React from 'react';
import { Box, Button, Anchor } from 'grommet';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { Menu } from 'grommet-icons';
import {selectLayer} from "../../selectors";
import { setLayer as setLayerAction } from "../../actions/layers";
import mapper from "../../utils/connect";

import { footerNavigation } from '../../config/navigation';
import NavItem from "./NavItem";

const FooterNavBase = () => (
    <Box
        responsive={true}
        justify='between'
        align='center'
        direction='row'
        background='light-1'
    >
        {footerNavigation.map(item =>
            <NavItem item={item}/>
        )}
    </Box>
);

FooterNavBase.propTypes = {
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
)(FooterNavBase);