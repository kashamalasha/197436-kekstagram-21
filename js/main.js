'use strict';

(function () {

  const PHOTO_QUANTITY = 25;

  let onSuccess = function (arr) {
    let thumbnails = document.querySelector(`.pictures`);
    let photosArray = arr.slice(0, PHOTO_QUANTITY);

    thumbnails.appendChild(window.thumbnails.renderPhotos(photosArray));
  };

  let onError = function (errorMessage) {
    let errorTemplate = document.querySelector(`#error`)
      .content
      .querySelector(`.error`);

    let errorParent = document.querySelector(`main`);
    let errorPopup = errorTemplate.cloneNode(true);
    let errorTitle = errorPopup.querySelector(`.error__title`);
    let errorClose = errorPopup.querySelector(`.error__button`);

    errorTitle.textContent = errorMessage;
    errorClose.textContent = `Закрыть`;

    errorClose.addEventListener(`click`, function () {
      errorParent.removeChild(errorPopup);
    });

    errorParent.appendChild(errorPopup);
  };

  window.backend.load(onSuccess, onError);

})();
