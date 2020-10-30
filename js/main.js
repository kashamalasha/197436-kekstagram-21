'use strict';

(function () {

  const PHOTO_QUANTITY = 25;

  let onSuccess = function (arr) {
    let thumbnails = document.querySelector(`.pictures`);
    let photosArray = arr.slice(0, PHOTO_QUANTITY);

    thumbnails.appendChild(window.thumbnails.renderPhotos(photosArray));
  };

  let onError = function (errorMessage) {
    window.popup.renderPopup(`error`, errorMessage, `Закрыть`);
  };

  window.backend.load(onSuccess, onError);

})();
