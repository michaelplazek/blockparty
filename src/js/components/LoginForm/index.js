import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    root:{
      padding: '40px'
    },
});

const LoginForm = ({
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    classes,
}) => (
        <form  noValidate autoComplete="off">
            <Grid
                container
                className={classes.root}
                justify='center'
                direction='column'
            >
                <TextField
                    id='email-field'
                    label='Email'
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id='password-field'
                    label='Password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <Button onClick={handleSubmit}>Submit</Button>
            </Grid>
        </form>
);

export default compose(
    withStyles(styles),
    withState('email', 'setEmail', ''),
    withState('password', 'setPassword', ''),
    withHandlers({
        handleSubmit: ({ handleSubmit, email, password }) => () => {
            handleSubmit(email, password)
        },
    }),
)(LoginForm);