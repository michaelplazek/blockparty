import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

import withStyles from "@material-ui/core/styles/withStyles";
import LoginForm from "../components/LoginForm";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import { validateInput } from "../utils/login";
import { registerUser } from "../utils/session";
import mapper from '../utils/connect';

const styles = theme => ({
    root: {
        background: 'white',
        height: '90vh',
    }
});

const SignUp = ({
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

// const actionMap = {
//     logInUser: logInUserAction,
// };
//
// const propMap = {
//
// };

export default compose(
    // mapper(propMap, actionMap),
    withStyles(styles),
    withState('email', 'setEmail', ''),
    withState('password', 'setPassword', ''),
    withHandlers({
        handleSubmit: ({ }) => (email, password) => {
            if (validateInput(email, password)) {
                registerUser(email, password);
            }
        },
    }),
)(SignUp);