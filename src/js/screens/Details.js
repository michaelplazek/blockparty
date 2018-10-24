import React from 'react';
import { compose } from 'recompose';

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import mapper from "../utils/connect";
import {selectAmount, selectContactInfo, selectLocation, selectMessage, selectAsk} from "../selectors";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
    root: {
        margin: `25px`
    },
    info: {
        marginLeft: '10px',
        padding: '2px',
        fontSize: '1.1em'
    },
    description: {
        padding: '5px'
    }
};

const Details = ({
    amount,
    contact,
    location,
    message,
    classes,
}) => (
    <div className={classes.root}>
    <Grid
        container
        direction='column'
    >
        <Grid item>
            <Grid container direction='row'>
                <Typography className={classes.description} variant='caption'>AMOUNT</Typography>
                <Typography className={classes.info} variant='subheading'>{amount}</Typography>
            </Grid>
        </Grid>
        <Grid item>
            <Grid container direction='row'>
                <Typography className={classes.description} variant='caption'>CONTACT</Typography>
                <Typography className={classes.info} variant='subheading'>{contact}</Typography>
            </Grid>
        </Grid>
        <Grid item>
            <Grid container direction='row'>
                <Typography className={classes.description} variant='caption'>LOCATION</Typography>
                <Typography className={classes.info} variant='subheading'>{location}</Typography>
            </Grid>
        </Grid>
        <Grid item>
            <Grid container direction='column'>
                <Typography className={classes.description} variant='caption'>INFO</Typography>
                <Typography className={classes.info} variant='subheading'>{message}</Typography>
            </Grid>
        </Grid>
    </Grid>
    </div>
);

const propMap = {
    ask: selectAsk
};

const actionMap = {

};

export default compose(
    mapper(propMap, actionMap),
    withStyles(styles),
)(Details);