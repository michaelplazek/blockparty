import React from "react";
import PropTypes from 'prop-types';
import { compose, lifecycle, withHandlers } from "recompose";
import { withRouter } from "react-router";
import mapper from "../../utils/connect";
import {
  selectAsk,
  selectAskLoaded, selectLayer, selectLayerOpen,
} from "../../selectors/index";
import { loadAsk as loadAskAction } from "../../actions/asks";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import Typography from "@material-ui/core/Typography/Typography";

import withStyles from "@material-ui/core/styles/withStyles";

import {selectAskDetails} from "./selectors";
import DetailList from "../../components/DetailList";
import {setLayer as setLayerAction, setLayerOpen as setLayerOpenAction} from "../../actions/layers";
import CreateAskOffer from "../../components/Flyout/CreateAskOffer";

const styles = () => ({
  root: {
    textAlign: "center",
    marginTop: "40px"
  },
  body: {
    marginTop: "10px"
  },
  buttons: {
    position: "fixed",
    bottom: "7em",
    right: "2em"
  },
});

const Ask = ({
  ask,
  items,
  classes,
  loaded,
  history,
  layer,
  open,
  handleOffer
}) => (
  <div>
    {loaded && (
      <div>
        {
          open && layer === "CREATE_ASK_OFFER" &&
          <CreateAskOffer
            handleClose={() => {}}
            handleSubmit={() => {}}
          />
        }
        <Grid>
          <Button onClick={() => history.goBack()}>Go Back</Button>
          <div className={classes.root}>
            <Grid item className={classes.body}>
              <Typography variant="display1">
                Ask for
              </Typography>
              <Typography variant="display2">
                {ask.volume} {ask.coin}
              </Typography>
            </Grid>
            <br />
            <DetailList items={items}/>
          </div>
          <Button
            className={classes.buttons}
            variant="extendedFab"
            color="primary"
            onClick={handleOffer}
          >
            Make an offer
          </Button>
        </Grid>
        <Grid />
      </div>
    )}
  </div>
);

Ask.propTypes = {
  ask: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired
};

const propMap = {
  ask: selectAsk,
  loaded: selectAskLoaded,
  items: selectAskDetails,
  layer: selectLayer,
  open: selectLayerOpen
};

const actionMap = {
  loadAsk: loadAskAction,
  setLayer: setLayerAction,
  setLayerOpen: setLayerOpenAction,
};

export default compose(
  withRouter,
  withStyles(styles),
  mapper(propMap, actionMap),
  lifecycle({
    componentDidMount() {
      const { search } = this.props.location;
      const id = search.substr(1);
      this.props.loadAsk(id);
    }
  }),
  withHandlers({
    handleOffer: ({ setLayer, setLayerOpen }) => () => {
      setLayer("CREATE_ASK_OFFER");
      setLayerOpen(true);
    }
  })
)(Ask);
