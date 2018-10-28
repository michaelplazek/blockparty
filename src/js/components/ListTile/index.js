import React from "react";
import PropTypes from "prop-types";

import { compose, lifecycle } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import {getCoinIcon} from "../List/utils";

const styles = () => ({
	root: {
		margin: "10px",
		padding: "8px",
		cursor: "pointer"
	},
	volume: {
		marginLeft: "10px"
	},
	type: {
		marginLeft: "6px"
	},
	body: {
		position: "relative",
		top: "4px"
	}
});

const Tile = ({ classes, type, age, onClick, volume }) => (
	<div onClick={onClick}>
		<Paper className={classes.root} elevation={1}>
			<Grid
				container
				justify="flex-start"
				direction="row"
				onClick={() => {}}
			>
				<Grid item>
					{getCoinIcon(type)}
				</Grid>
				<Grid item>
					<Grid container direction='row' className={classes.body}>
						<div className={classes.volume}>
							<Typography variant="title">{volume}</Typography>
						</div>
						<div className={classes.type}>
							<Typography variant="subheading">{type}</Typography>
						</div>
					</Grid>
				</Grid>
				{/*<Grid item>*/}
					{/*<Typography color="textSecondary" variant="subheading">*/}
						{/*{age}*/}
					{/*</Typography>*/}
				{/*</Grid>*/}
			</Grid>
		</Paper>
	</div>
);

Tile.propTypes = {
	onClick: PropTypes.func.isRequired
};

Tile.defaultProp = {
};

export default compose(withStyles(styles))(Tile);