import React from 'react';

import PropTypes from 'prop-types';
import { compose, withHandlers, withState } from 'recompose';
import mapper from "../../utils/connect";

import { footerNavigation as navigation } from '../../config/navigation';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from 'react-router-dom'
import Tab from "@material-ui/core/Tab/Tab";

const styles = () => ({
   root: {
       width: '100%',
       bottom: 0,
       position: 'fixed',
   }
});

const FooterNavBase = ({ classes, handleChange, index }) => (
    <AppBar
        className={classes.root}
        position="static"
        color="default"
    >
        <Tabs
            value={index}
            onChange={(_, value) => handleChange(value)}
            indicatorColor="primary"
            textColor="primary"
            fullWidth={true}
        >
            {navigation.map(item =>
                <Tab icon={item.icon} label={item.label} key={item.index}/>
            )}
        </Tabs>
    </AppBar>
);

FooterNavBase.propTypes = {
    items: PropTypes.array,
};

const propMap = {

};

const actionMap = {

};

export default compose(
    mapper(propMap, actionMap),
    withRouter,
    withState('index', 'setIndex', 0),
    withHandlers({
        handleChange: ({ setIndex, history }) => (value) => {
            setIndex(value);
            history.push(navigation[value].path)
        },
    }),
    withStyles(styles),
)(FooterNavBase);