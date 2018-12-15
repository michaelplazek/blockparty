import React from "react";

import mapper from "../../utils/connect";
import { compose, withHandlers } from "recompose";
import { selectError, selectErrorMessage } from "../../selectors";
import { setError, setErrorMessage } from "../../actions/errors";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  root: theme.palette.errorButton

});

const ErrorNotification = ({ open, handleClose, message, classes }) => (
  <Snackbar
    open={open}
    onClose={handleClose}
    autoHideDuration={3000}
    ContentProps={{
      'aria-describedby': 'message-id',
      className: classes.root
    }}
    message={<span id="message-id">{message}</span>}
    anchorOrigin={{ vertical: 'top', horizontal: 'center',}}
    action={
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={handleClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </IconButton>
    }
  />
  );

const propMap = {
  message: selectErrorMessage,
  open: selectError
};

const actionMap = {
  setError,
  setErrorMessage
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  withHandlers({
    handleClose: ({ setError, setErrorMessage }) => () => {
      setError(false);
      setErrorMessage("");
    }
  })
)(ErrorNotification);
