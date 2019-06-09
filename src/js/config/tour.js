export const marketSteps = [
  {
    target: '.market-nav',
    header: 'Market',
    content: 'Search and filter available posts near you in the Market.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.filters',
    header: 'Filters',
    content: 'Filter posts by ask/bid, coin, or distance away from your current location.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.chart',
    header: 'Depth Chart',
    content: 'Use the depth chart to view available asks and bids in your area.' +
      ' Drag your finger to the desired price point to filter the map below.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.map',
    header: 'Map',
    content: 'After applying the desired filters, view available posts on the map. To view a post, ' +
      'click on the info window. From here you can make an offer.',
    disableBeacon: true,
    placement: 'auto',
  },
];

export const dashboardSteps = [
  {
    target: '.dashboard-nav',
    header: 'Dashboard',
    content: 'Create and manage orders, accept offers, and begin transactions in the Dashboard.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.create-post',
    header: 'Create Posts',
    content: 'Create a limit order by clicking the button and selecting either ask or bid. ' +
      'You will then need to enter some general information, including the volume, price, and type of coin. ' +
      'After your post is created, it will appear on the map in the Market.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.bids',
    header: 'My Bids',
    content: 'A bid is an order to buy. Track the bids that you have created here. Once you have made a bid, you can ' +
      'click on it here and view the details and any offers.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.asks',
    header: 'My Asks',
    content: 'An ask is an order to sell. Track the asks that you have created here. Once you have made an ask, you can ' +
      'click on it here and view the details and any offers.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.offers',
    header: 'My Offers',
    content: 'Track any offers that you have made on other users\' bids and asks. You can see ' +
      'the current status of your offer and whether or not it has been accepted.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.transactions',
    header: 'Accepted Offers',
    content: 'Once you have accepted an offer - or one of your offers has been accepted - you can ' +
      'begin the transaction. The buyer or seller\'s contact information will now become available, and ' +
      'you are ready to meet up in person.',
    disableBeacon: true,
    placement: 'auto',
  },
];

export const accountSteps = [
  {
    target: '.account-nav',
    header: 'Account',
    content: 'View and manage your account settings.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.account-info',
    header: 'Account Information',
    content: 'View your account information, including your bio and reputation. Reputation is based ' +
      'off of your completed transaction over your total transactions.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.settings',
    header: 'Settings',
    content: 'Update your account information or delete your account by going to the Settings screen.',
    disableBeacon: true,
    placement: 'auto',
  },
];

export const tourStyle = {
  options: {
    arrowColor: '#3f51b5'
  },
};

export const isVisited = () => window.localStorage.getItem('visited') === 'true';
export const setAppVisited = () => window.localStorage.setItem('visited', 'true');
