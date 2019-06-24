import React from "react";
import PropTypes from "prop-types";

import { dark, light } from "../../../theme";
import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import { getCoinIcon } from "../List/utils";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import moment from "moment";
import ListItem from "@material-ui/core/ListItem/ListItem";
import { getStatusColor } from "../../utils/status";
import { COLBALT } from "../../constants/colors";

const styles = () => ({
  coin: {
    margin: "4px 0px 0px 4px"
  },
  icon: {
    marginRight: "8px"
  },
  volume: {
    marginTop: "4px"
  },
  type: {
    position: "relative",
    bottom: "3px",
    left: "1px"
  }
});

const OfferTile = ({ classes, item, onClick, isDarkMode }) => {
  const theme = isDarkMode ? dark : light;
  return (
    <div>
      <Paper
        elevation={2}
        style={{
          background: isDarkMode ? COLBALT : undefined,
          margin: "5px"
        }}
      >
        <ListItem button onClick={onClick}>
          <ListItemText
            disableTypography={true}
            primary={
              <Grid direction="row" alignItems="center" container>
                <Grid className={classes.icon} item>
                  {getCoinIcon(item.coin, isDarkMode)}
                </Grid>
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <Typography
                        color={isDarkMode ? "secondary" : undefined}
                        className={classes.volume}
                        variant="title"
                      >
                        {item.volume}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.coin}>
                      <Typography
                        color={isDarkMode ? "secondary" : undefined}
                        variant="subheading"
                      >
                        {item.coin}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid className={classes.type} item>
                    <Typography variant="caption">
                      {item.bid ? "offer to sell" : "offer to buy"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            }
          />
          <ListItemText
            primary={
              <Typography
                style={getStatusColor(item.status, theme)}
                align="right"
                variant="caption"
              >
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
  )
};

OfferTile.propTypes = {
  onClick: PropTypes.func.isRequired
};

OfferTile.defaultProp = {};

export default compose(withStyles(styles))(OfferTile);
