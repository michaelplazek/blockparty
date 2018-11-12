export const DEFAULT_BID = {
  _id: {
    $oid: "0"
  },
  coin: "BTC",
  userId: "",
  owner: "",
  price: 0,
  volume: 0,
  lat: 0,
  lng: 0,
  isBid: true,
  timestamp: {
    $date: ""
  },
  location: {},
  offers: []
};
