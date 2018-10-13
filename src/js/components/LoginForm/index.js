import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
    root:{
      padding: '40px'
    },
});

const LoginForm = ({
   email,
   password,
   handleEmail,
   handlePassword,
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
                    onChange={input => handleEmail(input)}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id='password-field'
                    label='Password'
                    value={email}
                    onChange={input => handlePassword(input)}
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
        </form>


);

export default compose(
    withStyles(styles),
    withState('email', 'setEmail', ''),
    withState('password', 'setPassword', ''),
)(LoginForm);