if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('./serviceWorker.js')
    .then(function(swReg) {
      console.log('Service Worker is registered', swReg);
      getSubscription(swReg);
    })
    .catch(function(error) {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Push messaging is not supported');
}