import runtime from "serviceworker-webpack-plugin/lib/runtime";

const applicationServerPublicKey = process.env.PUBLIC_PUSH_KEY;

let isSubscribed = false;

const urlB64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const registerWorker = (userId, setSubscription) => {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    runtime
      .register()
      .then(function(swReg) {
        checkSubscription(swReg, userId, setSubscription);
      })
      .catch(function(error) {
        console.error("Service Worker Error", error);
      });
  } else {
    console.warn("Push messaging is not supported");
  }
};

const checkSubscription = (swReg, userId, setSubscription) => {
  swReg.pushManager.getSubscription().then(function(subscription) {
    isSubscribed = !(subscription === null);
    if (isSubscribed) {
      const data = {
        subscription,
        userId
      };
      setSubscription(data);
    } else {
      const convertedVapidKey = urlB64ToUint8Array(applicationServerPublicKey);
      swReg.pushManager
        .subscribe({
          applicationServerKey: convertedVapidKey,
          userVisibleOnly: true
        })
        .then(function(newSubscription) {
          console.log("New subscription added.");
          // send subscription to API
          const data = {
            subscription: newSubscription,
            userId
          };
          setSubscription(data);
        })
        .catch(function(e) {
          if (Notification.permission !== "granted") {
            console.log("Permission was not granted.");
          } else {
            console.error(
              "An error occurred during the subscription process.",
              e
            );
          }
        });
    }
  });
};
