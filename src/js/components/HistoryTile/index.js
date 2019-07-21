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
import { COLBALT } from "../../constants/colors";
import mapper from "../../utils/connect";
import {selectInfoText} from "./selectors";

const styles = () => ({
  root: {
    margin: "5px 0px 5px 0px",
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
    width: "100%",
    border: '1px #CCC solid',
    borderRadius: "4px"
  },
  sold: {
    position: "relative",
    top: '4px'
  },
  coin: {
    margin: "0px 0px 0px 4px"
  },
  icon: {
    marginRight: "8px",
    marginTop: "8px",
  },
});

const ListTile = ({ classes, className, onClick, item, isDarkMode, infoText }) => (
  <div className={`${classes.root} ${className}`} onClick={onClick}>
    <Paper
      elevation={0}
      style={{
        background: isDarkMode ? COLBALT : undefined
      }}
    >
      <ListItem button onClick={onClick}>
        <ListItemText
          disableTypography={true}
          primary={
            <Grid direction="row" container>
              <Grid className={classes.icon} item>
                {getCoinIcon(item.coin, isDarkMode)}
              </Grid>
              <Grid item>
                <Grid container direction='column'>
                  <Grid item className={classes.sold}>
                    <Typography
                      color={isDarkMode ? "secondary" : undefined}
                    >
                      {infoText}
                    </Typography>
                  </Grid>
                  <Grid item container direction='row'>
                    <Grid item>
                      <Typography
                        color={isDarkMode ? "secondary" : undefined}
                        className={classes.volume}
                        variant="subheading"
                      >
                        {item.volume}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.coin}>
                      <Typography
                        color={isDarkMode ? "secondary" : undefined}
                      >
                        {item.coin}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          }
        />
        <ListItemText
          primary={null}
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

const propMap = {
  infoText: selectInfoText
};

ListTile.propTypes = {
  onClick: PropTypes.func.isRequired
};

ListTile.defaultProp = {};

export default compose(
  withStyles(styles),
  mapper(propMap, {})
)(ListTile);
