export const marketSteps = [
  {
    target: '.market-nav',
    header: 'Market',
    content: 'Search and filter available posts near you in the Market.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.dashboard-nav',
    header: 'Market',
    content: 'Create and manage posts, accept offers, and begin transactions in the Dashboard.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.account-nav',
    header: 'Account',
    content: 'View and manage account settings, including your bio.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.filters',
    header: 'Filters',
    content: 'Filter posts by type, coin, or distance away from your current location.',
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
    target: '.create-post',
    header: 'Create Posts',
    content: 'Create an limit order for an ask or bid by clicking the fab and selecting a type. ' +
      'You will then need to enter some general information, like the volume, price, and type of coin.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.bids',
    header: 'My Bids',
    content: 'Track the bids that you have created. Once you have made a bid, you can ' +
      'click on it here and view the details.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.asks',
    header: 'My Asks',
    content: 'Track the asks that you have created. Once you have made an asks, you can ' +
      'click on it here and view the details.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.offers',
    header: 'My Offers',
    content: 'Track any offers that you have made on other user\'s bids and asks. You can see ' +
      'the current status of your offer and whether or not it has been accepted.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '.transactions',
    header: 'Accepted Offers',
    content: 'Once you have accepted an offer - or one of your offers has been accepted - you can ' +
      'begin the transaction. The buyer or sellers contact information will now become available, and ' +
      'you are ready to meet up in person.',
    disableBeacon: true,
    placement: 'auto',
  },
];

export const accountSteps = [
  {
    target: '.account-info',
    header: 'Account Information',
    content: 'View your account information, including you bio and reputation. Reputation is based ' +
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
