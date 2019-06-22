import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import numeral from "numeral";
import { USD } from "../../constants/currency";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";

const styles = () => ({
  paper: {
    margin: "40px 10px 0px 10px",
    padding: "30px",
    cursor: "pointer"
  },
  heading: {
    marginBottom: "0.5em"
  },
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start"
  },
  coin: {
    margin: "6px 0px 0px 6px"
  },
  rate: {
    margin: "3px 0px 0px 3px"
  }
});

const DetailBox = ({ post, classes, time, onClick, isDarkMode }) => (
  <Grid onClick={onClick} className={classes.paper}>
    <Grid container className={classes.box}>
      <Grid item>
        <Grid container direction="row">
          <Grid item className={classes.heading}>
            <Typography
              color={isDarkMode ? "textSecondary" : undefined}
              variant="h4"
            >
              {post.isBid ? "Buy" : "Sell"} {post.volume}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color={isDarkMode ? "textSecondary" : undefined}
              variant="headline"
              className={classes.coin}
            >
              {post.coin}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row">
          <Grid item>
            <Typography
              color={isDarkMode ? "textSecondary" : undefined}
              variant="headline"
            >
              at {numeral(post.price).format(USD)}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color={isDarkMode ? "textSecondary" : undefined}
              className={classes.rate}
              variant="caption"
            >
              /{post.coin}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography
          color={isDarkMode ? "textSecondary" : undefined}
          variant="headline"
        >
          for {numeral(post.price * post.volume).format(USD)}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
);

export default withStyles(styles)(DetailBox);
