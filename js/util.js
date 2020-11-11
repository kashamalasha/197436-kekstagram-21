'use strict';

const DEBOUNCE_INTERVAL = 500;

const Keys = {
  ENTER: {
    keyName: `Enter`
  },
  ESCAPE: {
    keyName: `Escape`
  }
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFromArray = (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

const getShuffledArray = (arr) => {
  const randomComparator = () => {
    return 0.5 - Math.random();
  };
  return arr.slice().sort(randomComparator);
};

const onEscPress = (evt, action) => {
  if (evt.key === Keys.ESCAPE.keyName) {
    evt.preventDefault();
    action();
  }
};

const onEnterPress = (evt, action) => {
  if (evt.key === Keys.ENTER.keyName) {
    action(evt);
  }
};

const debounce = (callback) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      callback(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

window.util = {
  getRandomInt,
  getRandomFromArray,
  getShuffledArray,
  onEscPress,
  onEnterPress,
  debounce
};
