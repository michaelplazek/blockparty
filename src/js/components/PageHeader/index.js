import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import mapper from "../../utils/connect";
import { setHeaderHeight as setHeaderHeightAction } from "../../actions/app";

import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Input from "@material-ui/core/Input/Input";
import withStyles from "@material-ui/core/styles/withStyles";
import {fade} from "@material-ui/core/styles/colorManipulator";
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList'
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuIcon from '@material-ui/icons/Menu';


const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

class PageHeader extends Component{
    constructor(props){
        super(props);

			this.saveRef = (ref) => this.containerNode = ref;
			this.state = {
				width: 0,
				height: 0,
			};
    }

	measure() {
		const {clientWidth, clientHeight} = this.containerNode;
		this.props.setHeaderHeight(clientHeight);
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
			this.state.height !== nextState.height
		)
	}

    render(){
        return(
          <div className={this.props.classes.root} ref={this.saveRef}>
						<AppBar position="static">
							<Toolbar>
								<IconButton className={this.props.classes.menuButton} color="inherit" aria-label="Menu">
									<FilterListIcon />
								</IconButton>
								<Typography color="inherit" className={this.props.classes.grow}>
									Filter
								</Typography>
								<Button color="inherit">Go to Chart View</Button>
							</Toolbar>
						</AppBar>
          </div>
        )
    }
}

PageHeader.propTypes = {
    title: PropTypes.string,
    actionItems: PropTypes.array,
};

PageHeader.defaultProps = {
	actionItems: [],
	title: '',
};

const propMap = {

};

const actionMap = {
	setHeaderHeight: setHeaderHeightAction,
};

export default compose(
	withStyles(styles),
	mapper(propMap, actionMap),
)(PageHeader);