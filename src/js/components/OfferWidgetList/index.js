import React from "react";
import PropTypes from "prop-types";

import OfferWidget from "../OfferWidget/index";
import {getTotal} from "../Flyout/DeleteAsk/utils";
import Grid from "@material-ui/core/Grid/Grid";
import Tile from "../Tile";
const OfferWidgetList = ({ offers, post }) => (
  <Tile
    color="#f2f2f2"
    title="Offers"
    count={offers.length}
  >
    <Grid
      container
      direction='column'
    >
      {
        offers.map((item, index) => <OfferWidget
          key={`${item.volume}-${index}`}
          total={getTotal(post.price, item.volume)}
          volume={post.volume}
          price={post.price}
          coin={post.coin}
          onClick={() => {}}
        />)
      }
    </Grid>
  </Tile>
);

OfferWidgetList.propTypes = {
  offers: PropTypes.array.isRequired
};

export default OfferWidgetList;