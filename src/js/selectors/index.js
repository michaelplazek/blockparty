import { createSelector } from "reselect";
import compose from "lodash/fp/compose";
import fpMap from "lodash/fp/map";
import get from "lodash/fp/get";
import find from "lodash/fp/find";
import filter from "lodash/fp/filter";
import moment from "moment";
import numeral from "numeral";
import { USD } from "../constants/currency";
import { getDistance } from "geolib";
import { getMilesFromMeters } from "../utils/location";
import orderBy from "lodash/fp/orderBy";
import head from "lodash/head";
import last from "lodash/last";
import { binify } from "./utils";
import { ADMIN_1, LOCALITY, POLITICAL } from "../constants/maps";

const NUMBER_OF_BINS = 100;

export const intoArray = (...args) => args;

// SESSION
export const selectIsLoggedIn = state => state.session.loggedIn;
export const selectSessionLoaded = state => state.session.sessionLoaded;
export const selectUsername = state => state.session.username;
export const selectUserId = state => state.session.userId;
export const selectCurrentLocation = state => state.session.location;

// FILTERS
export const selectFilterDistance = state => state.filters.distanceAway;
export const selectFilterCoin = state => state.filters.coin;
export const selectFilterType = state => state.filters.type;
export const selectFilterPrice = state => state.filters.price;
export const selectFilter = state => state.filters.filter;
export const selectFormattedFilterPrice = createSelector(
  selectFilterPrice,
  price => numeral(price).format(USD)
);

// OFFERS
export const selectMyOffers = state => state.offers.myOffers;
export const selectOffer = state => state.offers.offer;
export const selectUnfilteredOffers = state => state.offers.offers;
export const selectOffers = createSelector(
  selectUnfilteredOffers,
  filter(item => item.status !== "DECLINED")
);
export const selectOfferTimestamp = state => state.offers.offer.timestamp;
export const selectOfferVolume = state => state.offers.offer.volume;
export const selectOfferPrice = state => state.offers.offer.price;
export const selectOfferIsOnBid = state => state.offers.offer.bid;
export const selectOfferLoaded = state => state.offers.offerLoaded;
export const selectMyOffersLoaded = state => state.offers.myOffersLoaded;
export const selectOfferPostTime = createSelector(
  selectOfferTimestamp,
  timestamp => moment(timestamp).fromNow()
);
export const selectNumberOfMyOffers = createSelector(
  selectMyOffers,
  selectMyOffersLoaded,
  (offers, loaded) => (loaded ? offers.length : 0)
);
export const selectOfferTotal = createSelector(
  selectOfferPrice,
  selectOfferVolume,
  (price, volume) => numeral(price * volume).format(USD)
);

// ASKS
export const selectUnfilteredAsks = state => state.asks.asks;
export const selectAsks = createSelector(
  selectUnfilteredAsks,
  filter(item => !item.isAccepted)
);
export const selectAskLoaded = state => state.asks.askLoaded;
export const selectMyUnfilteredAsks = state => state.asks.myAsks;
export const selectMyAsks = createSelector(
  selectMyUnfilteredAsks,
  filter(item => !item.isAccepted)
);
export const selectAsksLoaded = state => state.asks.asksLoaded;
export const selectMyAsksLoaded = state => state.asks.myAsksLoaded;
export const selectNumberOfMyAsks = createSelector(
  selectMyAsksLoaded,
  selectMyAsks,
  (loaded, asks) => (loaded ? asks.length : 0)
);
export const selectAsksForDisplay = createSelector(selectAsks, asks =>
  asks.map(item => ({
    ...item,
    timestamp: moment(item.timestamp).format("MMM D")
  }))
);

// BIDS
export const selectUnfilteredBids = state => state.bids.bids;
export const selectBids = createSelector(
  selectUnfilteredBids,
  filter(item => !item.isAccepted)
);
export const selectBidLoaded = state => state.bids.bidLoaded;
export const selectMyUnfilteredBids = state => state.bids.myBids;
export const selectMyBids = createSelector(
  selectMyUnfilteredBids,
  filter(item => !item.isAccepted)
);
export const selectBidsLoaded = state => state.bids.bidsLoaded;
export const selectMyBidsLoaded = state => state.bids.myBidsLoaded;
export const selectNumberOfMyBids = createSelector(
  selectMyBidsLoaded,
  selectMyBids,
  (loaded, bids) => (loaded ? bids.length : 0)
);
export const selectBidsForDisplay = createSelector(selectBids, bids =>
  bids.map(item => ({
    ...item,
    timestamp: moment(item.timestamp).format("MMM D")
  }))
);

// BID
export const selectBid = state => state.bids.bid;
export const selectBidCoin = state => state.bids.bid.coin;
export const selectBidVolume = state => state.bids.bid.volume;
export const selectBidId = state => state.bids.bid._id;
export const selectBidPrice = state => state.bids.bid.price;
export const selectBidOwner = state => state.bids.bid.owner;
export const selectBidLocation = state => state.bids.bid.location;
export const selectBidTimestamp = state => state.bids.bid.timestamp;
export const selectBidPostTime = createSelector(selectBidTimestamp, timestamp =>
  moment(timestamp).fromNow()
);
export const selectBidCity = createSelector(
  selectBidLocation,
  compose(
    get("long_name"),
    find(
      item => item.types.includes(LOCALITY) && item.types.includes(POLITICAL)
    )
  )
);
export const selectBidState = createSelector(
  selectBidLocation,
  compose(
    get("short_name"),
    find(item => item.types.includes(ADMIN_1) && item.types.includes(POLITICAL))
  )
);
export const selectBidDisplayPrice = createSelector(selectBid, bid =>
  numeral(bid.price).format(USD)
);

export const selectBidTotal = createSelector(
  selectBidVolume,
  selectBidPrice,
  (volume, price) => numeral(volume * price).format(USD)
);
export const selectBidHasButton = createSelector(
  selectBidOwner,
  selectUsername,
  (owner, username) => owner !== username
);

// ASK
export const selectAsk = state => state.asks.ask;
export const selectAskCoin = state => state.asks.ask.coin;
export const selectAskVolume = state => state.asks.ask.volume;
export const selectAskId = state => state.asks.ask._id;
export const selectAskTimestamp = state => state.asks.ask.timestamp;
export const selectAskPrice = state => state.asks.ask.price;
export const selectAskLocation = state => state.asks.ask.location;
export const selectAskOwner = state => state.asks.ask.owner;
export const selectAskPostTime = createSelector(selectAskTimestamp, timestamp =>
  moment(timestamp).fromNow()
);
export const selectAskCity = createSelector(
  selectAskLocation,
  compose(
    get("long_name"),
    find(
      item => item.types.includes(LOCALITY) && item.types.includes(POLITICAL)
    )
  )
);
export const selectAskState = createSelector(
  selectAskLocation,
  compose(
    get("short_name"),
    find(item => item.types.includes(ADMIN_1) && item.types.includes(POLITICAL))
  )
);
export const selectAskDisplayPrice = createSelector(selectAsk, ask =>
  numeral(ask.price).format(USD)
);

export const selectAskTotal = createSelector(
  selectAskVolume,
  selectAskPrice,
  (volume, price) => numeral(volume * price).format(USD)
);

export const selectAskHasButton = createSelector(
  selectAskOwner,
  selectUsername,
  (owner, username) => owner !== username
);

// TRANSACTIONS
export const selectTransactions = state => state.transactions.transactions;
export const selectTransactionsLoaded = state =>
  state.transactions.transactionsLoaded;
export const selectTransactionsForDisplay = createSelector(
  selectTransactions,
  selectUserId,
  (transactions, userId) =>
    fpMap(item => ({
      ...item,
      status: "ACCEPTED",
      description: userId === item.sellerId ? "Ready to sell" : "Ready to buy"
    }))(transactions)
);

export const selectNumberOfMyTransactions = createSelector(
  selectTransactions,
  selectTransactionsLoaded,
  (transactions, loaded) => (loaded ? transactions.length : 0)
);

export const selectTransaction = state => state.transactions.transaction;
export const selectTransactionLoaded = state =>
  state.transactions.transactionLoaded;
export const selectTransactionSellerId = state =>
  state.transactions.transaction.sellerId;
export const selectTransactionSellerUsername = state =>
  state.transactions.transaction.sellerUsername;
export const selectTransactionBuyerId = state =>
  state.transactions.transaction.buyerId;
export const selectTransactionBuyerUsername = state =>
  state.transactions.transaction.buyerUsername;
export const selectTransactionBuyerContactInfo = state =>
  state.transactions.transaction.buyerContactInfo;
export const selectTransactionSellerContactInfo = state =>
  state.transactions.transaction.sellerContactInfo;
export const selectTransactionCompletedByBuyer = state =>
  state.transactions.transaction.completedByBuyer;
export const selectTransactionCompletedBySeller = state =>
  state.transactions.transaction.completedBySeller;

export const selectTransactionId = state => state.transactions.transaction._id;
export const selectTransactionCoin = state =>
  state.transactions.transaction.coin;
export const selectTransactionVolume = state =>
  state.transactions.transaction.volume;
export const selectTransactionPrice = state =>
  state.transactions.transaction.price;
export const selectTransactionType = createSelector(
  selectTransactionBuyerId,
  selectUserId,
  (buyerId, userId) => (userId === buyerId ? "BUYING" : "SELLING")
);
export const selectTransactionFormattedTotal = createSelector(
  selectTransactionPrice,
  selectTransactionVolume,
  (price, volume) => numeral(price * volume).format(USD)
);
export const selectUserIsSeller = createSelector(
  selectUserId,
  selectTransactionSellerId,
  (userId, sellerId) => userId === sellerId
);

export const selectUserIsBuyer = createSelector(
  selectUserId,
  selectTransactionBuyerId,
  (userId, buyerId) => userId === buyerId
);

export const selectTransactionDisplayPrice = createSelector(
  selectTransactionPrice,
  price => numeral(price).format(USD)
);

// TEMPORARY OFFER
export const selectOfferFormVolume = state => state.offer.volume;
export const selectContactInfo = state => state.offer.contactInfo;
export const selectAskOfferTotal = createSelector(
  selectAskPrice,
  selectOfferFormVolume,
  (price, volume) => numeral(price * volume).format(USD)
);

export const selectBidOfferTotal = createSelector(
  selectBidPrice,
  selectOfferFormVolume,
  (price, volume) => numeral(price * volume).format(USD)
);

// TEMPORARY ASK
export const selectAskFormCoin = state => state.ask.coin;
export const selectAskFormContactInfo = state => state.ask.contactInfo;
export const selectAskFormVolume = state => state.ask.volume;
export const selectAskFormPrice = state => state.ask.price;
export const selectFormattedAskPrice = createSelector(
  selectAskFormPrice,
  price => numeral(price).format(USD)
);
export const selectAskLatitude = state => state.ask.lat;
export const selectAskLongitude = state => state.ask.lng;
export const selectAskUseCurrentLocation = state =>
  state.ask.useCurrentLocation;
export const selectAskFormTotal = createSelector(
  selectAskFormVolume,
  selectAskFormPrice,
  (volume, price) => numeral(volume * price).format(USD)
);

// TEMPORARY BID
export const selectBidFormCoin = state => state.bid.coin;
export const selectBidFormContactInfo = state => state.bid.contactInfo;
export const selectBidFormVolume = state => state.bid.volume;
export const selectBidFormPrice = state => state.bid.price;
export const selectFormattedBidFormPrice = createSelector(
  selectBidFormPrice,
  price => numeral(price).format(USD)
);
export const selectBidLatitude = state => state.bid.lat;
export const selectBidLongitude = state => state.bid.lng;
export const selectBidUseCurrentLocation = state =>
  state.bid.useCurrentLocation;
export const selectBidFormTotal = createSelector(
  selectBidFormVolume,
  selectBidFormPrice,
  (volume, price) => numeral(volume * price).format(USD)
);

// LAYERS
export const selectLayer = state => state.layers.layer;
export const selectLayerOpen = state => state.layers.open;

// APP
export const selectNavHeight = state => state.app.navigationBarHeight;
export const selectHeaderHeight = state => state.app.headerHeight;
export const selectWindowHeight = state => state.app.windowHeight;
export const selectWindowWidth = state => state.app.windowWidth;
export const selectMarketView = state => state.app.marketView;

// MISC
export const selectBidHasOffer = createSelector(
  selectMyOffers,
  selectBidId,
  (myOffers, bidId) => {
    const ids = compose(
      fpMap(item => item.postId),
      filter(item => item.status !== "DECLINED")
    )(myOffers);
    return ids.includes(bidId);
  }
);

export const selectAskHasOffer = createSelector(
  selectMyOffers,
  selectAskId,
  (myOffers, askId) => {
    const ids = compose(
      fpMap(item => item.postId),
      filter(item => item.status !== "DECLINED")
    )(myOffers);
    return ids.includes(askId);
  }
);

export const selectAskOfferButtonText = createSelector(
  selectAskHasOffer,
  hasOffer => (hasOffer ? "Waiting for reply" : "Make an offer")
);

export const selectBidOfferButtonText = createSelector(
  selectBidHasOffer,
  hasOffer => (hasOffer ? "Waiting for reply" : "Make an offer")
);

export const selectMapMarkers = createSelector(
  selectAsks,
  selectBids,
  selectFilterType,
  selectFilterCoin,
  selectFilterDistance,
  selectCurrentLocation,
  (asks, bids, type, coin, filterDistance, currentLocation) => {
    const items = type === "ASK" ? asks : bids;
    return compose(
      fpMap(ask => ({
        lat: ask.lat,
        lng: ask.lng,
        id: ask._id,
        price: ask.price,
        volume: ask.volume,
        coin: ask.coin
      })),
      filter(ask => {
        const distance = getDistance(
          { latitude: ask.lat, longitude: ask.lng },
          { latitude: currentLocation.lat, longitude: currentLocation.lng }
        );
        const distanceInMiles = getMilesFromMeters(distance);
        return distanceInMiles < filterDistance;
      }),
      filter(ask => ask.coin === coin)
    )(items);
  }
);
export const selectMarketLoaded = createSelector(
  selectAsksLoaded,
  selectBidsLoaded,
  selectFilterType,
  (asksLoaded, bidsLoaded, type) =>
    (asksLoaded && type === "ASK") || (bidsLoaded && type === "BID")
);

export const selectDashboardLoaded = createSelector(
  selectMyAsksLoaded,
  selectMyBidsLoaded,
  (asksLoaded, bidsLoaded) => asksLoaded && bidsLoaded
);

