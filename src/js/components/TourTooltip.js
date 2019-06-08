import React from 'react';
import { compose } from 'recompose';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Typography, withStyles} from "@material-ui/core";
import withDimensions from "../HOCs/withDimensions";

const style = () => ({
  header: {
    padding: '0.5em',
  },
  body: {
    padding: '0.5em'
  },
  buttons: {
    marginTop: "0.5em"
  }
});

const Tooltip = ({
  height,
  width,
  index,
  step,
  backProps,
  primaryProps,
  tooltipProps,
  classes,
}) => (
  <div
    style={{
      height: `${height/4}px`,
      width: `${width/2}px`,
      background: 'whitesmoke',
      borderRadius: '10px',
      padding: '1em'
    }}
    {...tooltipProps}
  >
    <Grid container direction='column'>
      <Grid className={classes.header} item>
        <Typography variant='title'>{step.header}</Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          alignItems='center'
          direction='column'
        >
          <Grid className={classes.body} item>
            <Typography>{step.content}</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='row'
              alignItems='center'
              className={classes.buttons}
            >
              {index !== 0 && (
                <Grid item justify='flex-start'>
                  <Button {...backProps}>
                    Back
                  </Button>
                </Grid>
              )}
              <Grid item justify='flex-end'>
                <Button
                  variant="contained"
                  color="primary"
                  {...primaryProps}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default compose(
  withStyles(style),
  withDimensions,
)(Tooltip);