import React from "react";

import { compose } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import { getCoinIcon } from "../List/utils";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import { light, dark } from "../../../theme";
import { getStatusIcon } from "../../utils/status";
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
  },
  status: {
    position: "relative",
    left: "1em"
  },
  statusIcon: {
    marginLeft: "2px"
  }
});

const TransactionTile = ({ classes, item, onClick, isDarkMode }) => {
  const theme = isDarkMode ? dark : light;
  return (
    <div>
      <Paper
        style={{
          background: isDarkMode ? COLBALT : undefined,
          margin: "5px"
        }}
        elevation={2}
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
                      {item.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            }
          />
          <ListItemText
            primary={
              <Grid
                className={classes.status}
                container
                direction="row"
                alignItems="center"
                justify="flex-end"
              >
                <Grid item>
                  <Typography
                    style={theme.palette.statusOK}
                    align="right"
                    variant="caption"
                  >
                    {item.status}
                  </Typography>
                </Grid>
                <Grid className={classes.statusIcon} item>
                  {getStatusIcon(item.status, theme)}
                </Grid>
              </Grid>
            }
          />
        </ListItem>
      </Paper>
    </div>
  );
};

export default compose(withStyles(styles))(TransactionTile);
