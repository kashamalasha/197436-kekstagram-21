'use strict';

(function () {

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

  let onEscPress = function (evt, action) {
    if (evt.key === Keys.ESCAPE.keyName) {
      evt.preventDefault();
      action();
    }
  };

  let onEnterPress = function (evt, action) {
    if (evt.key === Keys.ENTER.keyName) {
      action();
    }
  };

  window.util = {
    getRandomInt,
    getRandomFromArray,
    onEscPress,
    onEnterPress
  };

})();
