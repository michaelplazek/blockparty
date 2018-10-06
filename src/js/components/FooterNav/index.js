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
import Grid from "@material-ui/core/Grid/Grid";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
   root: {
       width: '100%',
       bottom: 0,
       position: 'absolute',
   }
});

const FooterNavBase = ({ classes }) => (
    <AppBar
        className={classes.root}
        position="static"
        color="default"
    >
        <Tabs
            value={1}
            onChange={() => {}}
            indicatorColor="primary"
            textColor="primary"
            fullWidth={true}
        >
            {footerNavigation.map(item =>
                <NavItem item={item}/>
            )}
        </Tabs>
    </AppBar>
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
    withStyles(styles),
)(FooterNavBase);