export const DEFAULT_ASK = {
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
  isBid: false,
  timestamp: {
    $date: ""
  },
  location: {},
  offers: []
};
