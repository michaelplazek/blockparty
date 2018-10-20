import React from 'react';
import { compose, withHandlers } from 'recompose';

import withStyles from "@material-ui/core/styles/withStyles";
import LoginForm from "../components/LoginForm";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import { validateInput } from "../utils/login";
import { registerUser } from "../actions/session";
import mapper from "../utils/connect";

const styles = theme => ({
    root: {
        background: 'white',
        height: '90vh',
        padding: '20px',
    }
});

const Login = ({
   handleSignUp,
   classes,
}) => (
    <Grid
        className={classes.root}
        container
        justify='center'
        direction='column'
    >
        <Grid item>
            <Grid
                container
                direction='column'
                justify='center'
            >
                <Typography
                    align='center'
                    variant='display1'
                >
                    Sign Up
                </Typography>
                <LoginForm
                    onClick={handleSignUp}
                />
            </Grid>
        </Grid>
    </Grid>

);

const propMap = {

};

const actionMap = {
    registerUser,
};

export default compose(
    withStyles(styles),
    mapper(propMap, actionMap),
    withHandlers({
        handleSignUp: ({ registerUser, history }) => (email, password) => {
            if (validateInput(email, password)) {
                registerUser(email, password, history);
            }
        },
    }),
)(Login);