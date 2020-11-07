'use strict';

(function () {

  const onSuccess = function (arr) {
    window.thumbnails.initialPhotos = arr;
    window.thumbnails.renderPhotos(arr);
    window.filter.showFilters();
  };

  const onError = function (errorMessage) {
    window.popup.renderPopup(`error`, errorMessage, `Закрыть`);
  };

  window.backend.load(onSuccess, onError);

})();
