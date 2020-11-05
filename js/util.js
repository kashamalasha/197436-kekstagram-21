'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  const Keys = {
    ENTER: {
      keyName: `Enter`
    },
    ESCAPE: {
      keyName: `Escape`
    }
  };

  let getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let getRandomFromArray = function (arr) {
    return arr[getRandomInt(0, arr.length - 1)];
  };

  const getShuffledArray = function (arr) {
    let randomComparator = function () {
      return 0.5 - Math.random();
    };
    return arr.slice().sort(randomComparator);
  };

  let onEscPress = function (evt, action) {
    if (evt.key === Keys.ESCAPE.keyName) {
      evt.preventDefault();
      action();
    }
  };

  let onEnterPress = function (evt, action) {
    if (evt.key === Keys.ENTER.keyName) {
      action(evt);
    }
  };

  const debounce = function (callback) {
    let lastTimeout = null;

    return function (...args) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
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

})();
