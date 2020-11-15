/**
 * Misc. functions
 */
import firebaseConfig from './firebase';

// async load firebase
export const importFirebase = async () => {
  const firebase = await import(
    /* webpackChunkName: 'firebase' */ 'firebase/app'
  );
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  await import(/* webpackChunkName: 'auth' */ 'firebase/auth');
  await import(/* webpackChunkName: 'database' */ 'firebase/database');

  return { auth: firebase.auth, database: firebase.database };
};

// first letter capitalize
export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

// get status colors
export const getColor = type => {
  switch (type) {
    case 'pending': {
      return '#ffc107';
    }
    case 'delivered': {
      return '#28a745';
    }
    case 'accepted': {
      return '#6c757d';
    }
    case 'picked': {
      return '#6c757d';
    }
    case 'onmyway': {
      return '#17a2b8';
    }
    case 'cancelled': {
      return '#dc3545';
    }
    default: {
      return null;
    }
  }
};

export const getNewColors = type => {
  switch (type) {
    case 'pending': {
      // rgb(255,183,128)
      return '#f00';
    }
    case 'delivered': {
      return '#00bd39';
    }
    case 'accepted': {
      return '#e0ca05';
    }
    case 'secondary': {
      return 'rgb(250, 120, 22)';
    }
    case 'blue': {
      return '#042954';
    }
    case 'red': {
      return '#b10000';
    }
    case 'gray': {
      return '#646464';
    }
    case 'dark-gray': {
      return '#6f6f6f';
    }
    case 'light-gray': {
      return '#a7a7a7';
    }
    case 'bg-gray': {
      return '#f1f1f1';
    }
    default: {
      return null;
    }
  }
};

export const getFinancesColors = type => {
  switch (type) {
    case 'pending': {
      return 'rgb(255,199,156)';
    }
    case 'pending-bg': {
      return 'rgb(255,183,128,0.2)';
    }
    case 'paid': {
      return 'rgb(94,204,127)';
    }
    case 'paid-bg': {
      return 'rgb(0,189,57,0.2)';
    }
    default: {
      return '';
    }
  }
};

// deep clone an object
export const deepClone = obj => {
  var copy;

  // eslint-disable-next-line
  if (obj == null || typeof obj != 'object') {
    return obj;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = deepClone(obj[attr]);
      }
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
};

// check if empty or not
export const isEmpty = (object, dataType = 'object') => {
  switch (dataType) {
    case 'object': {
      return !Object.keys(object).length;
    }
    default: {
      return false;
    }
  }
};

// format time
export const formatTime = time => {
  const timeArray = time.split(':');
  let timeToReturn = '';

  if (timeArray.length) {
    if (timeArray[0] > 12) {
      timeToReturn = `${timeArray[0] - 12}:${timeArray[1]}`;
    }
  }

  return timeToReturn;
};
