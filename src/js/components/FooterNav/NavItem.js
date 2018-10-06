import React from 'react';
import { Box, Heading, Paragraph, Text, Button } from 'grommet';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import Typography from "@material-ui/core/Typography/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab/Tab";

const styles = () => ({
    item: {
        'flexGrow': 1,
    },
});

const NavItem = ({ item, classes }) => (
    <Tab
        className={classes.item}
        icon={item.icon}
        label={item.label}
    />
);

NavItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavItem);