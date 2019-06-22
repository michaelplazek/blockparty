import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";

import mapper from "../../utils/connect";
import { setHeaderHeight as setHeaderHeightAction } from "../../actions/app";

import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {selectIsDarkMode} from "../../selectors";
import {COLBALT, DARK_GREY, GOLD, PURPLE} from "../../constants/colors";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
};

class PageHeader extends Component {
  constructor(props) {
    super(props);

    this.saveRef = ref => (this.containerNode = ref);
    this.state = {
      width: 0,
      height: 0
    };
  }

  measure() {
    const { clientWidth, clientHeight } = this.containerNode;
    this.props.setHeaderHeight(clientHeight);
    this.setState({
      width: clientWidth,
      height: clientHeight
    });
  }

  componentDidMount() {
    this.measure();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.measure();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height
    );
  }

  render() {
    return (
      <div className={this.props.classes.root} ref={this.saveRef}>
        <AppBar position="static" style={{ background: this.props.isDarkMode ? COLBALT : undefined, color: GOLD }}>
          <Toolbar>
            {this.props.leftHandButton && (
              <Button onClick={this.props.leftHandAction} color="inherit">
                {this.props.leftHandButton}
              </Button>
            )}
            <Typography
              align="left"
              variant="headline"
              color="inherit"
              className={this.props.classes.grow}
            >
              {this.props.leftHandLabel}
            </Typography>
            <IconButton
              onClick={this.props.rightHandAction}
              className={`${this.props.classes.menuButton} settings`}
              color="inherit"
            >
              {this.props.rightHandIcon}
            </IconButton>
            {this.props.rightHandButton && (
              <Button onClick={this.props.rightHandAction} color="inherit">
                {this.props.rightHandButton}
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {this.props.showSubheader && this.props.subheader}
      </div>
    );
  }
}

PageHeader.propTypes = {
  leftHandLabel: PropTypes.string,
  rightHandLabel: PropTypes.string,
  leftHandIcon: PropTypes.node,
  leftHandAction: PropTypes.func,
  leftHandButton: PropTypes.string,
  rightHandAction: PropTypes.func,
  rightHandIcon: PropTypes.node,
  rightHandButton: PropTypes.string,
  showSubheader: PropTypes.bool,
  subheader: PropTypes.node
};

PageHeader.defaultProps = {
  rightHandLabel: "",
  leftHandLabel: null,
  rightHandButton: "",
  leftHandIcon: null,
  rightHandIcon: null,
  leftHandAction: () => {},
  rightHandAction: () => {},
  showSubheader: false,
  subheader: null
};

const propMap = {
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  setHeaderHeight: setHeaderHeightAction
};

export default compose(
  withStyles(styles),
  mapper(propMap, actionMap)
)(PageHeader);
