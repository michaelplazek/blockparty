import React from 'react';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom'

import withStyles from "@material-ui/core/styles/withStyles";
import LoginForm from "../components/LoginForm";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

import { validateInput } from "../utils/login";
import { logInUser } from "../actions/session";
import mapper from "../utils/connect";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    root: {
        background: 'white',
        height: '90vh',
        padding: '20px',
    },
    signUpText: {
        marginRight: '20px',
        align: 'right',
        cursor: 'pointer',
    }
});

const Login = ({
    handleLogIn,
    handleSignUp,
    classes,
    history,
}) => (
    <Grid
        className={classes.root}
        container
        justify='center'
        direction='column'
    >
        <Grid
            item
        >
            <Grid
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
                    onClick={handleLogIn}
                />
            </Grid>
            <Typography
                className='signUpText'
                align='right'
            >
                or, <Button
                className='signUpLink'
                onClick={() => history.push('/register')}
                variant='text'
            >
                sign up for account
            </Button>
            </Typography>
        </Grid>



    </Grid>

);

const propMap = {

};

const actionMap = {
    logInUser,
};

export default compose(
    withStyles(styles),
    withRouter,
    mapper(propMap, actionMap),
    withHandlers({
        handleLogIn: ({ logInUser, history }) => (email, password) => {
            if (validateInput(email, password)) {
                logInUser(email, password, history);
            }
        },
    }),
)(Login);