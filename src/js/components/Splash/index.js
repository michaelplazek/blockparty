import React from "react";
import { compose, lifecycle } from "recompose";
import mapper from "../../utils/connect";
import {
  selectIsDarkMode,
  selectVisited,
  selectWindowHeight,
  selectWindowWidth
} from "../../selectors";
import { setVisited as setVisitedAction } from "../../actions/app";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { bounceIn, fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import {COLBALT, DARK_BLUE, GOLD, WHITESMOKE} from "../../constants/colors";

const Bounce = styled.div`
  animation: 3s ${keyframes`${bounceIn}`};
`;
const Fade = styled.div`
  animation: 4s ${keyframes`${fadeIn}`}
  text-align: end;  
  position: relative;
  top: 5px;
  right: 10px; 
`;

const Splash = ({ width, height, isDarkMode }) => (
  <div
    style={{
      width,
      height,
      backgroundColor: isDarkMode ? COLBALT : DARK_BLUE
    }}
  >
    <Grid container justify="center">
      <Grid
        item
        style={{
          position: "relative",
          top: height / 2.25,
          color: isDarkMode ? GOLD : WHITESMOKE,
          fontFamily: "Quicksand"
        }}
      >
        <Bounce>
          <Typography
            variant="h2"
            style={{
              color: isDarkMode ? GOLD : WHITESMOKE,
              fontFamily: "Quicksand"
            }}
          >
            Blockparty
          </Typography>
        </Bounce>
        <Grid align="flex-end" item>
          <Fade>
            <Typography
              variant="caption"
              style={{
                color: isDarkMode ? GOLD : WHITESMOKE,
                fontFamily: "Quicksand"
              }}
            >
              A forum for P2P crypto exchanges
            </Typography>
          </Fade>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

const propMap = {
  visited: selectVisited,
  height: selectWindowHeight,
  width: selectWindowWidth,
  isDarkMode: selectIsDarkMode
};

const actionMap = {
  setVisited: setVisitedAction
};

export default compose(
  mapper(propMap, actionMap),
  lifecycle({
    componentDidMount() {
      const { visited, setVisited } = this.props;
      if (!visited) {
        setTimeout(() => {
          setVisited();
        }, 4000);
      }
    }
  })
)(Splash);
