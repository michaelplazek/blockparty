export function isLocationSet() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(isSet, isNotSet);
  } else {
    return false;
  }
}

export const getCurrentLocation = () => {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      return new Promise((resolve, reject) => {
        resolve(pos.coords);
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        latitude: 40.564714,
        longitude: -105.09065
      });
    });
  }
};

function isSet(position) {
  return true;
}

function isNotSet(error) {
  return false;
}

export function getMilesFromMeters(i) {
  return i * 0.000621371192;
}

export function getMetersFromMiles(i) {
  return i * 1609.344;
}
