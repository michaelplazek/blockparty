import { createSelector } from "reselect";
import compose from "lodash/fp/compose";
import fpMap from "lodash/fp/map";
import get from "lodash/fp/get";
import orderBy from "lodash/fp/orderBy";
import find from "lodash/fp/find";
import filter from "lodash/fp/filter";
import moment from "moment";
import numeral from "numeral";
import { USD, USD_DECIMALS } from "../constants/currency";
import { getDistance } from "geolib";
import {getMilesFromMeters} from "../utils/location";
import { footerNavigation as navigation } from "../config/navigation";

import { ADMIN_1, LOCALITY, POLITICAL } from "../constants/maps";

const NUMBER_OF_BINS = 100;

export const intoArray = (...args) => args;
export const fromProps = path => (state, props) => get(props, path);

// SESSION
export const selectIsLoggedIn = state => state.session.loggedIn;
export const selectSessionLoaded = state => state.session.sessionLoaded;
export const selectUsername = state => state.session.username;
export const selectUserId = state => state.session.userId;
export const selectUserCreated = state => state.session.created;
export const selectUserCompletedTransactions = state =>
  state.session.completedTransactions;
export const selectUserCancelledTransactions = state =>
  state.session.cancelledTransactions;
export const selectUserBio = state => state.session.bio;
export const selectCurrentLocation = state => state.session.location;
export const selectCurrentLocationLoaded = state =>
  state.session.locationLoaded;
export const selectUserReputation = createSelector(
  selectUserCompletedTransactions,
  selectUserCancelledTransactions,
  (completed, cancelled) => {
    const total = completed + cancelled;
    return total > 0 ? (completed / total) * 5 : 0;
  }
);
export const selectInitialLocation = state => state.session.initialLocation;

// FILTERS
export const selectFilterDistance = state => state.filters.distanceAway;
export const selectFilterCoin = state => state.filters.coin;
export const selectFilterType = state => state.filters.type;
export const selectFocusField = state => state.filters.focusField;
export const selectFilterPrice = state => state.filters.price;
export const selectFilterReputation = state => state.filters.reputation;
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
  selectIsLoggedIn,
  (owner, username, loggedIn) => loggedIn && (owner !== username)
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
  selectIsLoggedIn,
  (owner, username, loggedIn) => loggedIn && (owner !== username)
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
export const selectOfferFormVolumeInUSD = state => state.offer.volumeInUSD;
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
export const selectFormattedBidOfferTotalInUSD = createSelector(
  selectBidPrice,
  selectBidVolume,
  (price, volume) => numeral(price * volume).format(USD)
);
export const selectBidOfferTotalInUSD = createSelector(
  selectBidPrice,
  selectBidVolume,
  (price, volume) => price * volume
);
export const selectFormattedOfferFormVolume = createSelector(
  selectOfferFormVolumeInUSD,
  price => numeral(price).format(USD_DECIMALS)
);
export const selectFormattedAskOfferTotalInUSD = createSelector(
  selectAskPrice,
  selectAskVolume,
  (price, volume) => numeral(price * volume).format(USD)
);
export const selectAskOfferTotalInUSD = createSelector(
  selectAskPrice,
  selectAskVolume,
  (price, volume) => price * volume
);

// TEMPORARY ASK
export const selectAskFormCoin = state => state.ask.coin;
export const selectAskFormContactInfo = state => state.ask.contactInfo;
export const selectAskFormVolume = state => state.ask.volume;
export const selectAskFormVolumeInUSD = state => state.ask.volumeInUSD;
export const selectAskFormPrice = state => state.ask.price;
export const selectFormattedAskFormPrice = createSelector(
  selectAskFormPrice,
  price => numeral(price).format(USD_DECIMALS)
);
export const selectFormattedAskFormVolume = createSelector(
  selectAskFormVolumeInUSD,
  price => numeral(price).format(USD_DECIMALS)
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
export const selectBidFormVolumeInUSD = state => state.bid.volumeInUSD;
export const selectFormattedBidFormVolume = createSelector(
  selectBidFormVolumeInUSD,
  price => numeral(price).format(USD_DECIMALS)
);
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
export const selectModal = state => state.layers.modal;
export const selectModalOpen = state => state.layers.modalOpen;

// APP
export const selectNavHeight = state => state.app.navigationBarHeight;
export const selectHeaderHeight = state => state.app.headerHeight;
export const selectWindowHeight = state => state.app.windowHeight;
export const selectScreenHeight = createSelector(
  selectNavHeight,
  selectHeaderHeight,
  selectWindowHeight,
  (nav, header, window) => window - nav - header
);
export const selectWindowWidth = state => state.app.windowWidth;
export const selectMarketView = state => state.app.marketView;
export const selectTouched = state => state.app.touched;
export const selectAskInfo = state => state.app.askInfo;
export const selectBidInfo = state => state.app.bidInfo;
export const selectIsDarkMode = state => state.app.darkMode;
export const selectModeLoaded = state => state.app.modeLoaded;

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

export const selectIsWithinRange = createSelector(
  selectFilter,
  selectInitialLocation,
  (filters, currentLocation) => ask => {
    const distance = getDistance(
      { latitude: ask.lat, longitude: ask.lng },
      { latitude: currentLocation.lat, longitude: currentLocation.lng }
    );
    const distanceInMiles = getMilesFromMeters(distance);
    return distanceInMiles < filters.distanceAway;
  }
);

export const selectIsWithinPrice = createSelector(
  selectFilterPrice,
  price => item =>
    !item.isBid
      ? item.price <= price || price === undefined
      : item.price >= price || price === undefined
);

export const selectMapMarkers = createSelector(
  selectAsks,
  selectBids,
  selectFilter,
  selectIsWithinPrice,
  selectIsWithinRange,
  (asks, bids, filters, withinPrice, withinRange) => {
    let items;
    if (filters.type === "ALL") {
      items = asks.concat(bids);
    } else {
      items = filters.type === "ASK" ? asks : bids;
    }
    return compose(
      fpMap(ask => ({
        isBid: ask.isBid,
        lat: ask.lat,
        lng: ask.lng,
        id: ask._id,
        price: ask.price,
        volume: ask.volume,
        coin: ask.coin
      })),
      filter(withinPrice),
      filter(withinRange),
      filter(item => item.coin === filters.coin),
      filter(item => item.reputation >= filters.reputation)
    )(items);
  }
);
export const selectMarketLoaded = createSelector(
  selectAsksLoaded,
  selectBidsLoaded,
  selectCurrentLocationLoaded,
  selectFilterType,
  (asksLoaded, bidsLoaded, locationLoaded, type) =>
    (locationLoaded &&
      ((asksLoaded && type === "ASK") || (bidsLoaded && type === "BID"))) ||
    (asksLoaded && bidsLoaded && type === "ALL")
);

export const selectDashboardLoaded = createSelector(
  selectMyAsksLoaded,
  selectMyBidsLoaded,
  (asksLoaded, bidsLoaded) => asksLoaded && bidsLoaded
);

export const totalActionItems = createSelector(
  selectNumberOfMyAsks,
  selectNumberOfMyBids,
  selectNumberOfMyOffers,
  selectNumberOfMyTransactions,
  (asks, bids, offers, transactions) => asks + bids + offers + transactions
);

export const selectUserCanDelete = createSelector(
  totalActionItems,
  count => count === 0
);

export const selectMyAskCoins = createSelector(
  selectMyUnfilteredAsks,
  fpMap(item => item.coin)
);

export const selectMyBidCoins = createSelector(
  selectMyUnfilteredBids,
  fpMap(item => item.coin)
);

// Errors
export const selectError = state => state.errors.error;
export const selectErrorMessage = state => state.errors.message;

// Metrics
export const selectCurrencyNames = state => state.metrics.currencies;
export const selectCurrencyNamesLoaded = state =>
  state.metrics.currenciesLoaded;
export const selectAskCurrencyItems = createSelector(
  selectCurrencyNames,
  selectMyAskCoins,
  (names, coins) =>
    compose(
      fpMap(item => ({
        label: `${item.assetName} - ${item.assetSymbol}`,
        value: item.assetSymbol,
        disabled: coins.includes(item.assetSymbol)
      }))
    )(names)
);
export const selectFilteredAskCurrencyItems = createSelector(
  selectCurrencyNames,
  selectMyAskCoins,
  (names, coins) =>
    compose(
      fpMap(item => ({
        label: `${item.assetName} - ${item.assetSymbol}`,
        value: item.assetSymbol
      })),
      filter(coin => !coins.includes(coin.assetSymbol))
    )(names)
);
export const selectBidCurrencyItems = createSelector(
  selectCurrencyNames,
  selectMyBidCoins,
  (names, coins) =>
    compose(
      fpMap(item => ({
        label: `${item.assetName} - ${item.assetSymbol}`,
        value: item.assetSymbol,
        disabled: coins.includes(item.assetSymbol)
      }))
    )(names)
);

export const selectFilteredBidCurrencyItems = createSelector(
  selectCurrencyNames,
  selectMyBidCoins,
  (names, coins) =>
    compose(
      fpMap(item => ({
        label: `${item.assetName} - ${item.assetSymbol}`,
        value: item.assetSymbol
      })),
      filter(coin => !coins.includes(coin.assetSymbol))
    )(names)
);
export const selectCurrencyItems = createSelector(
  selectCurrencyNames,
  fpMap(item => ({
    label: `${item.assetName} - ${item.assetSymbol}`,
    value: item.assetSymbol,
    disabled: false
  }))
);

export const selectBidList = createSelector(
  selectBids,
  selectFilter,
  selectIsWithinPrice,
  selectIsWithinRange,
  (bids, filters, withinPrice, withinRange) =>
    compose(
      orderBy(["price"], ["desc"]),
      fpMap(bid => ({
        isBid: bid.isBid,
        id: bid._id,
        price: numeral(bid.price).format(USD),
        volume: bid.volume
      })),
      filter(withinPrice),
      filter(withinRange),
      filter(item => item.coin === filters.coin),
      filter(item => item.reputation >= filters.reputation)
    )(bids)
);

export const selectAskList = createSelector(
  selectAsks,
  selectFilter,
  selectIsWithinPrice,
  selectIsWithinRange,
  (asks, filters, withinPrice, withinRange) =>
    compose(
      orderBy(["price"], ["asc"]),
      fpMap(ask => ({
        isBid: ask.isBid,
        id: ask._id,
        price: numeral(ask.price).format(USD),
        volume: ask.volume
      })),
      filter(withinPrice),
      filter(withinRange),
      filter(item => item.coin === filters.coin),
      filter(item => item.reputation >= filters.reputation)
    )(asks)
);

export const selectLastPrice = state => state.metrics.lastPrice;

export const selectIsSubscribed = state => state.app.notifications.isSubscribed;
export const selectSubscription = state => state.app.notifications.subscription;
export const selectVisited = state => state.app.visited;
export const selectNavIndex = state => state.app.navigationIndex;
export const selectListOpen = state => state.app.listOpen;

export const selectUser = state => state.users.user;
export const selectRun = state => state.app.run;
export const selectQR = state => state.metrics.QR;
export const selectNavigationItems = () => navigation;
export const selectPostLoginPath = state => state.session.postLoginPath;
