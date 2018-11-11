import React from "react";
import PropTypes from "prop-types";
import get from "lodash/fp/get";
import { compose, withHandlers } from "recompose";
import { withRouter } from "react-router-dom";
import numeral from "numeral";
import moment from "moment";

import ListItem from "@material-ui/core/ListItem/ListItem";
import Typography from "@material-ui/core/Typography/Typography";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import { USD } from "../../constants/currency";
import Paper from "@material-ui/core/Paper/Paper";

const styles = () => ({
  root: {
    margin: "5px"
  },
  coin: {
    margin: "4px 0px 0px 4px"
  }
});

const ListItemBase = ({ item, classes, onClick }) => (
  <Paper className={classes.root}>
    <ListItem button onClick={onClick}>
      <ListItemText
        disableTypography={true}
        primary={
          <Grid direction="row" container>
            <Grid item>
              <Typography variant="headline">{item.volume}</Typography>
            </Grid>
            <Grid item className={classes.coin}>
              <Typography variant="subheading">{item.coin}</Typography>
            </Grid>
          </Grid>
        }
        secondary={
          <Typography variant="subheading">
            {numeral(item.price).format(USD)}
          </Typography>
        }
      />
      <ListItemText
        primary={
          <Typography align="right" variant="caption">
            {get("location[1].long_name")(item)},{" "}
            {get("location[3].short_name")(item)}
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
);

ListItemBase.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired
};

export default compose(
  withStyles(styles),
  withRouter,
  withHandlers({})
)(ListItemBase);
