import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom'

import mapper from "../../utils/connect";
import { footerNavigation as navigation } from '../../config/navigation';
import { setNavHeight as setNavHeightAction } from "../../actions/app";

import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import withStyles from "@material-ui/core/styles/withStyles";
import Tab from "@material-ui/core/Tab/Tab";

const styles = () => ({
   root: {
       width: '100%',
       bottom: 0,
       position: 'fixed',
   }
});

class FooterNavBase extends Component{
	constructor(props){
		super(props);

		this.saveRef = (ref) => this.containerNode = ref;
		this.state = {
			index: 0,
			width: 0,
			height: 0,
		};

		this.handleChange = this.handleChange.bind(this);
	}

	measure() {
		const {clientWidth, clientHeight} = this.containerNode;
		this.props.setNavHeight(clientHeight);
		this.setState({
			width: clientWidth,
			height: clientHeight,
		})
	}

	componentDidMount() {
		this.measure();
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		this.measure()
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		return (
			this.state.width !== nextState.width ||
			this.state.height !== nextState.height ||
			this.state.index !== nextState.index
		)
	}

	handleChange(value){
		this.setState({ index: value });
		this.props.history.push(navigation[value].path);
	};

	render(){
		return(
			<div
				className={this.props.classes.root}
				ref={this.saveRef}
			>
			<AppBar
				position="static"
				color="default"
			>
				<Tabs
					value={this.state.index}
					onChange={(_, value) => this.handleChange(value)}
					indicatorColor="primary"
					textColor="primary"
					fullWidth={true}
				>
					{navigation.map(item =>
						<Tab icon={item.icon} label={item.label} key={item.index}/>
					)}
				</Tabs>
			</AppBar>
			</div>
		)
	}
}

FooterNavBase.propTypes = {
    items: PropTypes.array,
};

const propMap = {

};

const actionMap = {
	setNavHeight: setNavHeightAction,
};

export default compose(
    mapper(propMap, actionMap),
    withRouter,
    withStyles(styles),
)(FooterNavBase);
