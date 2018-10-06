import React from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem/ListItem";

import { getCoinIcon } from "./utils";
import Typography from "@material-ui/core/Typography/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
   root: {
       borderBottom: 'solid 1px',
       margin: '1px 0px 1px 0px'
   }
});

const ListItemBase = ({ item, classes }) => (

    <ListItem button className={classes.root}>
        <ListItemIcon>
            {getCoinIcon(item.coin)}
        </ListItemIcon>
        <ListItemText
            disableTypography={true}
            primary={
                <Typography variant='title'>{item.amount}</Typography>
            }
            secondary={
                <Typography variant='subheading'>{item.coin}</Typography>
            }
        />
        <ListItemText
            primary={
                <Typography align='right' variant='caption'>{item.location}</Typography>
            }
            secondary={
                <Typography align='right' variant='caption'>{item.timestamp}</Typography>
            }
        />
    </ListItem>
);

ListItemBase.propTypes = {
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemBase);