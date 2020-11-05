'use strict';

(function () {

  let onSuccess = function (arr) {
    window.thumbnails.initialPhotos = arr;
    window.thumbnails.renderPhotos(arr);
    window.filter.showFilters();
  };

  let onError = function (errorMessage) {
    window.popup.renderPopup(`error`, errorMessage, `Закрыть`);
  };

  window.backend.load(onSuccess, onError);

})();
