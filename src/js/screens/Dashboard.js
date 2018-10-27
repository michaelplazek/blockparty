import React from "react";
import { compose, withState } from "recompose";
import mapper from "../utils/connect";

import Tile from "../components/Tile";

import {
  setLayer as setLayerAction,
  setLayerOpen as setLayerOpenAction
} from "../actions/layers";

import PageHeader from "../components/PageHeader";
import MailIcon from "@material-ui/icons/Mail";
import AddIcon from "@material-ui/icons/Add";
import CreateAsk from "../components/Flyout/CreateAsk/index";
import CreateBid from "../components/Flyout/CreateBid/index";

import withDimensions from "../HOCs/withDimensions";
import Button from "@material-ui/core/Button/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import { selectLayer } from "../selectors";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Icon from '@material-ui/core/Icon';
import Grow from "@material-ui/core/Grow/Grow";

const styles = () => ({
  // createAskButton: {
  //   position: "absolute",
  //   bottom: "8em",
  //   right: "2em"
  // },
  // createBidButton: {
  //   position: "absolute",
  //   bottom: "12em",
  //   right: "2em"
  // },
	addButton: {
		  position: "absolute",
		  bottom: "8em",
		  right: "2em"
	},
	buttonContainer: {
		position: "absolute",
		bottom: "8em",
		right: "2em",
		// textAlign: "vertical",
		display: "flex",
		flexDirection: "column"
	},
	buttons: {
		margin: "6px"
	}
});

const Dashboard = ({ setLayerOpen, setLayer, classes, layer, showButtons, setShowButtons }) => (
  <div>
    {layer === "CREATE_ASK" && <CreateAsk />}
    {layer === "CREATE_BID" && <CreateBid />}
    <PageHeader
      leftHandLabel="Dashboard"
      rightHandLabel="Inbox"
      rightHandIcon={<MailIcon />}
    />
    <Tile title="Asks" count={0} />
    <Tile title="Bids" count={0} />
    <div>
      {showButtons &&
			<Grow in={showButtons}>
        <div
					className={classes.buttonContainer}
					onMouseLeave={() => setTimeout(() => setShowButtons(false), 500)}
					onMouseOver={() => setShowButtons(true)}
				>
					<Button
						className={classes.buttons}
						variant="extendedFab"
						onClick={() => {
							setLayer("CREATE_BID");
							setLayerOpen(true);
						}}
					>
						Create a new bid
					</Button>
					<Button
						className={classes.buttons}
						variant="extendedFab"
						onClick={() => {
						setLayer("CREATE_ASK");
						setLayerOpen(true);
					}}
						>
						Create a new ask
					</Button>
        </div>
			</Grow>
      }

      {!showButtons &&
			<Button
				className={classes.addButton}
				color='primary'
				variant="fab"
				onClick={() => {
					setShowButtons(true)
				}}
			>
				<AddIcon />
			</Button>
      }
    </div>
  </div>
);

const propMap = {
  layer: selectLayer
};

const actionMap = {
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction
};

export default compose(
  mapper(propMap, actionMap),
  withState('showButtons', 'setShowButtons', false),
  withStyles(styles),
  withDimensions
)(Dashboard);
