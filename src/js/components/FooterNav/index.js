import React, { Component } from "react";
import get from "lodash/get";

import PropTypes from "prop-types";
import { compose } from "recompose";
import { withRouter, Link } from "react-router-dom";

import mapper from "../../utils/connect";
import {
  setNavHeight as setNavHeightAction,
  setNavIndex as setNavIndexAction
} from "../../actions/app";
import { footerNavigation as navigation } from "../../config/navigation";

import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab/Tab";
import {
  selectIsDarkMode,
  selectMarketView,
  selectNavIndex
} from "../../selectors";
import { COLBALT } from "../../constants/colors";

const styles = () => ({
  root: {
    width: "100%",
    bottom: 0,
    position: "fixed",
    zIndex: 100
  }
});

class FooterNavBase extends Component {
  constructor(props) {
    super(props);

    this.saveRef = ref => (this.containerNode = ref);
    this.state = {
      width: 0,
      height: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.getIndexFromPath = this.getIndexFromPath.bind(this);
  }

  getIndexFromPath() {
    const { pathname } = this.props.history.location;
    return get(navigation.find(item => item.path === pathname), "index");
  }

  measure() {
    const { clientWidth, clientHeight } = this.containerNode;
    this.props.setNavHeight(clientHeight);
    this.setState({
      width: clientWidth,
      height: clientHeight
    });
  }

  componentDidMount() {
    this.measure();
    this.setState({
      index: this.getIndexFromPath()
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.measure();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height ||
      this.props.index !== nextProps.index
    );
  }

  handleChange(value) {
    const { setNavIndex } = this.props;
    setNavIndex(value);
  }

  render() {
    return (
      <div className={this.props.classes.root} ref={this.saveRef}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.props.index}
            onChange={(_, value) => this.handleChange(value)}
            indicatorColor={this.props.isDarkMode ? "secondary" : "primary"}
            textColor={this.props.isDarkMode ? "secondary" : "primary"}
            fullWidth={true}
            style={{
              background: this.props.isDarkMode ? COLBALT : undefined
            }}
          >
            {navigation.map(item => (
              <Tab
                className={item.className}
                icon={item.icon}
                label={item.label}
                key={item.index}
                component={Link}
                to={item.path}
              />
            ))}
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

FooterNavBase.propTypes = {
  items: PropTypes.array
};

const propMap = {
  view: selectMarketView,
  index: selectNavIndex,
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  setNavHeight: setNavHeightAction,
  setNavIndex: setNavIndexAction
};

export default compose(
  mapper(propMap, actionMap),
  withRouter,
  withStyles(styles)
)(FooterNavBase);
