import React from "react";
import { compose, withState } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Collapsible from "react-collapsible";
import Button from "@material-ui/core/Button/Button";

const styles = () => ({
  root: {
    display: "flex",
    minHeight: "100%",
    flexDirection: "column",
    margin: "2px",
    padding: "10px",
    cursor: "pointer",
  },
  coin: {
    margin: "0px 0px 0px 4px"
  },
  volume: {
  },

  button: {
    margin: "4px"
  },
});

const OfferWidget = ({
                       classes,
                       total,
                       volume,
                       coin,
                       time,
                       open,
                       setOpen,
  handleAccept,
  handleDecline
}) => (
  <div onClick={() => setOpen(!open)}>
    <Paper className={classes.root} elevation={1}>
      <Grid container direction="column">
        <Grid item>
          <Grid container justify='space-between' direction="row">
            <Grid item>
              <Typography variant="title">{total}</Typography>
            </Grid>
            <Grid item>
              <Grid direction="row" container>
                <Grid item>
                  <Typography className={classes.volume} variant="subheading">
                    {volume}
                  </Typography>
                </Grid>
                <Grid item className={classes.coin}>
                  <Typography variant="subheading">{coin}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant='caption'>{time}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid className={classes.buttons} container>
            <Collapsible open={open}>
              <Grid
                direction="row"
                alignItems="center"
                justify="center"
                container
              >
                <Grid className={classes.button} item>
                  <Button
                    onClick={handleAccept}
                    variant="raised"
                    color="primary"
                  >
                    Accept
                  </Button>
                </Grid>
                <Grid className={classes.button} item>
                  <Button
                    onClick={handleDecline}
                    variant="raised"
                  >
                    Decline
                  </Button>
                </Grid>
              </Grid>
            </Collapsible>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </div>
);

export default compose(
  withStyles(styles),
  withState("open", "setOpen", false)
)(OfferWidget);
