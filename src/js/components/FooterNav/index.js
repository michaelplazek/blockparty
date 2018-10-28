import React, { Component } from "react";
import get from "lodash/get";

import PropTypes from "prop-types";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import mapper from "../../utils/connect";
import { setNavHeight as setNavHeightAction } from "../../actions/app";
import { footerNavigation as navigation } from "../../config/navigation";

import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab/Tab";

const styles = () => ({
  root: {
    width: "100%",
    bottom: 0,
    position: "fixed"
  }
});

class FooterNavBase extends Component {
  constructor(props) {
    super(props);

    this.saveRef = ref => (this.containerNode = ref);
    this.state = {
      index: this.getIndexFromPath(),
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
			index: this.getIndexFromPath(),
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.measure();
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return (
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height ||
      this.state.index !== nextState.index
    );
  }

  handleChange(value) {
    this.setState({ index: value });
    this.props.history.push(navigation[value].path);
  }

  render() {
    return (
      <div className={this.props.classes.root} ref={this.saveRef}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.index}
            onChange={(_, value) => this.handleChange(value)}
            indicatorColor="primary"
            textColor="primary"
            fullWidth={true}
          >
            {navigation.map(item => (
              <Tab icon={item.icon} label={item.label} key={item.index} />
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

const propMap = {};

const actionMap = {
  setNavHeight: setNavHeightAction
};

export default compose(
  mapper(propMap, actionMap),
  withRouter,
  withStyles(styles)
)(FooterNavBase);
