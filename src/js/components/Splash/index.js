import React from "react";
import { compose, lifecycle } from "recompose";
import withStyles from "@material-ui/core/styles/withStyles";
import mapper from "../../utils/connect";
import {selectVisited, selectWindowHeight, selectWindowWidth} from "../../selectors";
import {setVisited as setVisitedAction} from "../../actions/app";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import { bounceIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const styles = theme => ({
  root: {
    background: theme.palette.inverse.background,
    height: "100%",
    width: "100%",
  }
});

const Bounce = styled.div`animation: 3s ${keyframes`${bounceIn}`}`;

const Splash = ({
  width,
  height,
}) => (
  <div
    style={{
      width,
      height,
      backgroundColor: "#1a237e",
    }}
  >
    <Grid container justify='center'>
      <Grid
        item
        style={{
          position: "relative",
          top: height/2.25,
        }}
      >
        <Bounce>
          <Typography
            variant='h2'
            style={{
              color: "#f2f2f2",
              fontFamily: 'Quicksand',
            }}
          >
            Blockparty
          </Typography>
        </Bounce>
      </Grid>
    </Grid>
  </div>
);

const propMap = {
  visited: selectVisited,
  height: selectWindowHeight,
  width: selectWindowWidth,
};

const actionMap = {
  setVisited: setVisitedAction,
};

export default compose(
  mapper(propMap, actionMap),
  withStyles(styles),
  lifecycle({
    componentDidMount() {
      const { visited, setVisited } = this.props;
      if (!visited) {
        setTimeout(() => {
          setVisited();
        }, 4000)
      }
    },
  }),
)(Splash)