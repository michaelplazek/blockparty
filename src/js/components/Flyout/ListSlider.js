import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../utils/connect";
import {
  selectHeaderHeight,
  selectListOpen,
  selectNavHeight,
  selectWindowHeight,
  selectWindowWidth
} from "../../selectors";
import {setListOpen as setListOpenAction} from "../../actions/app";
import Slide from "@material-ui/core/Slide/Slide";
import Paper from "@material-ui/core/Paper";

const styles = () => ({
  root: {
    position: "absolute",
    left: 0,
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

const ListSlider = ({
  classes,
  navHeight,
  headerHeight,
  windowHeight,
  width,
  children,
  open,
  direction
}) => (
    <Slide direction={direction} in={open} mountOnEnter unmountOnExit>
      <div
        className={classes.root}
        style={{
          position: 'absolute',
          top: `${(windowHeight - navHeight - headerHeight)/2 + headerHeight}px`,
          height: `${(windowHeight - navHeight - headerHeight)/2}px`,
          // width: `${width - 60}px`,
          zIndex: 99,
          borderRight: '#CCC 1px solid',
        }}
      >
        {children}
      </div>
    </Slide>
);

ListSlider.propTypes = {
  onClose: PropTypes.func,
  direction: PropTypes.string,
  title: PropTypes.string
};

ListSlider.defaultProps = {
  onClose: () => {},
  direction: "right",
  title: ""
};

const propMap = {
  width: selectWindowWidth,
  windowHeight: selectWindowHeight,
  navHeight: selectNavHeight,
  headerHeight: selectHeaderHeight,
  open: selectListOpen,
};

const actionMap = {
  setListOpen: setListOpenAction,
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles)
)(ListSlider);