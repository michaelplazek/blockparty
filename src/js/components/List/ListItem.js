import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';

import { getCoinIcon } from "./utils";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Typography from "@material-ui/core/Typography/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
   root: {
       borderBottom: 'solid 1px #CCC',
       margin: '1px 0px 1px 0px'
   }
});

const ListItemBase = ({ item, classes, handleClick }) => (

    <ListItem
        button
        className={classes.root}
        onClick={() => handleClick(item._id)}
    >
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
    onClick: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
};

export default compose(
    withStyles(styles),
    withRouter,
    withHandlers({
        handleClick: ({ history, onClick, path }) => (id) => {
            onClick(id);
            history.push(path);
        }
    }),
)(ListItemBase);