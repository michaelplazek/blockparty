import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../utils/connect";
import {
  selectIsDarkMode,
  selectLayerOpen,
  selectWindowHeight,
  selectWindowWidth
} from "../../selectors";
import {
  setLayer as setLayerAction,
  setLayerOpen as setLayerOpenAction
} from "../../actions/layers";

import Modal from "@material-ui/core/Modal/Modal";
import Slide from "@material-ui/core/Slide/Slide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {DARK_GREEN, WHITE} from "../../constants/colors";

const styles = () => ({
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

const Flyout = ({
  classes,
  height,
  width,
  children,
  open,
  setLayerOpen,
  setLayer,
  size,
  onClose,
  title,
  direction,
  isDarkMode
}) => (
  <Modal
    open={open}
    onClose={onClose}
    onBackdropClick={() => {
      setLayer("");
      setLayerOpen(false);
    }}
  >
    <Slide direction={direction} in={open} mountOnEnter unmountOnExit>
      <div
        style={{
          height: height,
          width: `${width - width / size}px`,
          position: "absolute",
          left: 0,
          background: isDarkMode ? DARK_GREEN : WHITE
        }}
      >
        <Grid direction="row" justify="space-between" container>
          <Grid className={classes.title} item>
            <Typography color={isDarkMode ? 'secondary' : undefined} variant="title">{title}</Typography>
          </Grid>
          <Grid item>
            <div
              className={classes.closeButton}
              onClick={() => {
                onClose();
                setLayer("");
                setLayerOpen(false);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </Grid>
        </Grid>
        {children}
      </div>
    </Slide>
  </Modal>
);

Flyout.propTypes = {
  onClose: PropTypes.func,
  direction: PropTypes.string,
  title: PropTypes.string
};

Flyout.defaultProps = {
  onClose: () => {},
  direction: "right",
  title: ""
};

const propMap = {
  height: selectWindowHeight,
  width: selectWindowWidth,
  open: selectLayerOpen,
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  setLayerOpen: setLayerOpenAction,
  setLayer: setLayerAction
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles)
)(Flyout);
