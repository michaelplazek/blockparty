import React from "react";
import PropTypes from "prop-types";

import { compose } from "recompose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/es/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";

const styles = () => ({
  root: {

  }
});

const Notification = ({
                        classes,
                        anchor,
                      type,
  open,
  onClose,
  timeToClose,
  anchor,
  message,
                      }) => (
  <div className={classes.root}>
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={timeToClose}
      message={message}
      anchorOrigin={anchor}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>,
      ]}
    />
  </div>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  timeToClose: PropTypes.number,
  anchor: PropTypes.string,
};

Notification.defaultProps = {
  timeToClose: 3000,
  anchor: 'top'
};

export default compose(
  withStyles(styles)
)(Notification);
