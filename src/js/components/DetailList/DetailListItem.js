import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const DetailListItem = ({ name, value, isLast, onClick }) => (
  <ListItem divider={!isLast}>
    <Grid container justify="space-between" onClick={onClick}>
      <Grid item>
        <ListItemText
          disableTypography
          primary={<Typography type="subheading">{name}</Typography>}
        />
      </Grid>
      <Grid item>
        <ListItemText>{value}</ListItemText>
      </Grid>
    </Grid>
  </ListItem>
);

DetailListItem.propTypes = {
  name: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
  onClick: PropTypes.func
};

DetailListItem.defaultProps = {
  isLast: false,
  onClick: undefined
};

export default DetailListItem;
