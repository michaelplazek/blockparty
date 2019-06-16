import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../utils/connect";
import {
  selectModalOpen,
  selectWindowHeight,
  selectWindowWidth
} from "../../selectors";
import {
  setModalOpen as setModalOpenAction,
  setModal as setModalAction
} from "../../actions/layers";

import Slide from "@material-ui/core/Slide/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import { Dialog } from "@material-ui/core";

const styles = () => ({
  root: {
    borderRadius: "10px",
    background: "white"
  },
  closeButton: {
    textAlign: "right",
    position: "relative",
    right: "1.5em",
    top: "1.5em",
    cursor: "pointer"
  },
  title: {
    position: "relative",
    top: "1.5em",
    left: "1.5em"
  }
});

const ModalBase = ({
  classes,
  children,
  open,
  setModalOpen,
  setModal,
  onClose,
  title
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    onBackdropClick={() => {
      setModal("");
      setModalOpen(false);
    }}
  >
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <div className={classes.root}>
        <Grid direction="row" justify="space-between" container>
          <Grid className={classes.title} item>
            <Typography variant="title">{title}</Typography>
          </Grid>
          <Grid item>
            <div
              className={classes.closeButton}
              onClick={() => {
                onClose();
                setModal("");
                setModalOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </Grid>
        </Grid>
        {children}
      </div>
    </Slide>
  </Dialog>
);

ModalBase.propTypes = {
  onClose: PropTypes.func
};

ModalBase.defaultProps = {
  onClose: () => {}
};

const propMap = {
  height: selectWindowHeight,
  width: selectWindowWidth,
  open: selectModalOpen
};

const actionMap = {
  setModalOpen: setModalOpenAction,
  setModal: setModalAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles)
)(ModalBase);
