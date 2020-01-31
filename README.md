# (Blockparty)[https://blockparty.global/]
Blockparty is a P2P cash-for-crypto exchange, a "Craigslist for crypto".

## Setup
Install dependencies
```
yarn
```

(Optional) Set port
```
export PORT=3000
```

Set Google Maps API Key
```
export GOOGLE_MAPS_KEY=<API key>
```

Set the Blocktap API Key
```
export BLOCKTAP_TOKEN=<API key>
```

Set the Recaptcha secret
```
export RECAPTCHA_SECRET=<Recaptcha secret>
```

Set the Recaptcha site key
```
export RECAPTCHA_SITE_KEY=<Recaptcha site key>
```

Set the public Push API key
```
export PUBLIC_PUSH_KEY=<public push key>
```

Set the Monero wallet address for donations
```
export MONERO_ADDRESS=<wallet address>
```

Set Bitcoin wallet address for donations
```
export BITCOIN_ADDRESS=1Bm2ybwiyag1uzP6BNBS9eJE2EaQQ151ZL
```

Set the API URL
```
export BASE_URL=https://infinity.blockparty-prod.com
```

Set the Blocktap API URL
```
export BLOCKTAP_URL=https://api.blocktap.io/graphql
```

Set the Webpack mode
```
export MODE=production
```

(Optional) Start the [API](https://github.com/michaelplazek/cash-for-crypto-api)

To run:
```
npm start
```

To build:
```
npm run build
```
