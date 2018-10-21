import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';

import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../utils/connect";
import { selectLayerOpen, selectWindowHeight, selectWindowWidth } from "../../selectors";
import { setLayerOpen as setLayerOpenAction } from "../../actions/layers";

import Modal from "@material-ui/core/Modal/Modal";
import Slide from "@material-ui/core/Slide/Slide";

const styles = () => ({
	root: {
		position: 'absolute',
		left: 0,
		width: '100px',
		background: 'white'
	}
});

const Flyout = ({ classes, height, width, children, open, setLayerOpen, size, onClose }) => (
	<Modal
		open={open}
		onClose={onClose}
		onBackdropClick={() => setLayerOpen(false)}
	>
		<Slide direction="right" in={open} mountOnEnter unmountOnExit>
			<div
				className={classes.root}
				style={{ height: height, width: `${width - width/size}px` }}
			>
				{children}
			</div>
		</Slide>
	</Modal>
);

Flyout.propTypes = {
	onClose: PropTypes.func,
};

Flyout.defaultProps = {
	onClose: () => {}
};

const propMap = {
	height: selectWindowHeight,
	width: selectWindowWidth,
	open: selectLayerOpen
};

const actionMap = {
	setLayerOpen: setLayerOpenAction
};

export default compose(
	mapper(propMap, actionMap),
	withStyles(styles)
)(Flyout);