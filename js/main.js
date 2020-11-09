'use strict';

(function () {

  const onSuccess = (loadedPhotosArray) => {
    window.thumbnails.initialPhotos = loadedPhotosArray;
    window.thumbnails.renderPhotos(loadedPhotosArray);
    window.filter.show();
  };

  const onError = (errorMessage) => {
    window.popup.renderPopup(`error`, errorMessage, `Закрыть`);
  };

  window.backend.load(onSuccess, onError);

})();
