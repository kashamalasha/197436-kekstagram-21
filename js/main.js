'use strict';

(function () {

  const PHOTO_QUANTITY = 25;

  let onSuccess = function (arr) {
    let photosArray = arr.slice(0, PHOTO_QUANTITY);
    window.thumbnails.renderPhotos(photosArray);
    window.filter.showFilters(photosArray);
  };

  let onError = function (errorMessage) {
    window.popup.renderPopup(`error`, errorMessage, `Закрыть`);
  };

  window.backend.load(onSuccess, onError);

})();
