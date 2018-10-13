import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

import withStyles from "@material-ui/core/styles/withStyles";
import LoginForm from "../components/LoginForm";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ({
    root: {
        background: 'white',
        height: '90vh',
    }
});

const Login = ({
    handleSubmit,
    classes,
}) => (
    <Grid
        className={classes.root}
        container
        direction='column'
        justify='center'
    >
        <Typography
            align='center'
            variant='display1'
        >
            Login In
        </Typography>
        <LoginForm
            handleSubmit={handleSubmit}
        />
    </Grid>

);

export default compose(
    withStyles(styles),
    withState('email', 'setEmail', ''),
    withState('password', 'setPassword', ''),
    withHandlers({
        handleSubmit: () => (email, password) => {
            console.log(email);
            console.log(password);
        },
    }),
)(Login);