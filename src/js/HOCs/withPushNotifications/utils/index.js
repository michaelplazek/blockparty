import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const applicationServerPublicKey = process.env.PUBLIC_PUSH_KEY;

let isSubscribed = false;

export const registerWorker = () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
  }
    const swReg = runtime.register();
  //     .then(function(swReg) {
  //       console.log('Service Worker is registered', swReg);
  //       getSubscription(swReg);
  //     })
  //     .catch(function(error) {
  //       console.error('Service Worker Error', error);
  //     });
  // } else {
  //   console.warn('Push messaging is not supported');
  // }
};

const getSubscription = (swReg) => {
  swReg.pushManager.getSubscription()
    .then(function(subscription) {
      isSubscribed = !(subscription === null);
      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }
    });
};

const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}