import React from "react";
import { compose } from "recompose";
import PropTypes from "prop-types";

import mapper from "../../utils/connect";
import {
  selectHeaderHeight, selectIsDarkMode,
  selectListOpen,
  selectNavHeight,
  selectWindowHeight,
  selectWindowWidth
} from "../../selectors";
import { setListOpen as setListOpenAction } from "../../actions/app";
import Slide from "@material-ui/core/Slide/Slide";
import {DARK_GREEN} from "../../constants/colors";

const ListSlider = ({
  navHeight,
  headerHeight,
  windowHeight,
  children,
  open,
  direction,
  isDarkMode
}) => (
  <Slide direction={direction} in={open} mountOnEnter unmountOnExit>
    <div
      style={{
        position: "absolute",
        left: 0,
        top: `${(windowHeight - navHeight - headerHeight) / 2 +
          headerHeight}px`,
        height: `${(windowHeight - navHeight - headerHeight) / 2}px`,
        zIndex: 99,
        borderRight: "#CCC 1px solid",
        background: isDarkMode ? DARK_GREEN : 'whitesmoke',
        overflowY: 'auto',
        overflowX: 'hidden',
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
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  setListOpen: setListOpenAction
};

export default compose(
  mapper(propMap, actionMap),
)(ListSlider);
