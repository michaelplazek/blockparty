import React from 'react';
import { compose, lifecycle } from 'recompose';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        flexDirection: 'column',
    }
});

const Page = ({ classes, children }) => (
    <div className={classes.root}>
        { children }
    </div>
);

export default compose(
    withStyles(styles)
)(Page);