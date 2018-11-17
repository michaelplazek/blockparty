import React from "react";
import PropTypes from "prop-types";

import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import { getCoinIcon } from "../List/utils";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import moment from "moment";
import ListItem from "@material-ui/core/ListItem/ListItem";

const styles = () => ({
  root: {
    margin: "5px",
  },
  coin: {
    margin: "4px 0px 0px 4px"
  },
  icon: {
    marginRight: "8px"
  },
  volume: {
    marginTop: "4px"
  }
});

const OfferTile = ({ classes, item, onClick }) => (
  <div>
    <Paper className={classes.root} elevation={1}>
      <ListItem button onClick={onClick}>
        <ListItemText
          disableTypography={true}
          primary={
            <Grid direction="row" className={classes.left} container>
              <Grid className={classes.icon} item>
                {getCoinIcon(item.coin)}
                </Grid>
              <Grid item>
                <Typography className={classes.volume} variant="title">{item.volume}</Typography>
              </Grid>
              <Grid item className={classes.coin}>
                <Typography variant="subheading">{item.coin}</Typography>
              </Grid>
            </Grid>
          }
        />
        <ListItemText
          primary={
            <Typography align="right" variant="caption">
              {item.status}
            </Typography>
          }
          secondary={
            <Typography align="right" variant="caption">
              {moment(item.timestamp).fromNow()}
            </Typography>
          }
        />
      </ListItem>
    </Paper>
  </div>
);

OfferTile.propTypes = {
  onClick: PropTypes.func.isRequired
};

OfferTile.defaultProp = {};

export default compose(withStyles(styles))(OfferTile);