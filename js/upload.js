'use strict';

(function () {
  let uploadStart = document.querySelector(`#upload-file`);
  let uploadImgOverlay = document.querySelector(`.img-upload__overlay`);
  let uploadCancel = document.querySelector(`#upload-cancel`);
  let imgUpload = document.querySelector(`.img-upload`);
  let formUpload = imgUpload.querySelector(`.img-upload__form`);

  let form = {
    hashtags: formUpload.querySelector(`.text__hashtags`),
    description: formUpload.querySelector(`.text__description`),
    effects: formUpload.querySelector(`.img-upload__effects`),
    scaleValue: formUpload.querySelector(`.img-upload__scale input`),
    scaleButtons: formUpload.querySelectorAll(`.img-upload__scale button`),
    submitButton: formUpload.querySelector(`.img-upload__submit`)
  };

  let onUploadEscPress = function (evt) {
    if (document.activeElement !== form.hashtags
        && document.activeElement !== form.description) {
      window.util.onEscPress(evt, closeUpload);
    }
  };

  let openUpload = function () {
    uploadImgOverlay.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    window.effects.form.effectSlider.classList.add(`hidden`);
    form.scaleValue.value = `100%`;

    form.effects.addEventListener(`change`, window.effects.onEffectsChange);
    form.hashtags.addEventListener(`blur`, window.validate.checkHashtags);
    form.hashtags.addEventListener(`input`, window.validate.clearValidity);
    document.addEventListener(`keydown`, onUploadEscPress);

    for (let button of form.scaleButtons) {
      button.addEventListener(`click`, window.effects.setScaleFactor);
    }

    formUpload.addEventListener(`submit`, onUploadFormSubmit);
  };

  let closeUpload = function () {
    uploadImgOverlay.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    uploadStart.value = ``;
    form.hashtags.textContent = ``;
    form.description.textContent = ``;

    form.effects.removeEventListener(`change`, window.effects.onEffectChange);
    form.hashtags.removeEventListener(`blur`, window.validate.checkHashtags);
    form.hashtags.removeEventListener(`input`, window.validate.clearValidity);
    document.removeEventListener(`keydown`, onUploadEscPress);

    for (let button of form.scaleButtons) {
      button.removeEventListener(`click`, window.effects.setScaleFactor);
    }

    formUpload.removeEventListener(`submit`, onUploadFormSubmit);
  };

  let onUploadFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formUpload), closeUpload, onUploadError);
  };

  let onUploadError = function (errorMessage) {
    let errorTemplate = document.querySelector(`#error`)
      .content
      .querySelector(`.error`);

    let errorParent = document.querySelector(`main`);
    let errorPopup = errorTemplate.cloneNode(true);
    let errorTitle = errorPopup.querySelector(`.error__title`);
    let errorClose = errorPopup.querySelector(`.error__button`);

    errorTitle.textContent = errorMessage;

    closeUpload();
    errorParent.appendChild(errorPopup);

    let onErrorEscPress = function (evt) {
      window.util.onEscPress(evt, closeError);
    };

    let closeError = function (evt) {

      if (evt) {
        evt.preventDefault();
        if (evt.target.className === `error` ||
            evt.target.className === `error__button`) {
          errorParent.removeChild(errorPopup);
        }
      } else {
        errorParent.removeChild(errorPopup);
      }

      document.removeEventListener(`click`, closeError);
      document.removeEventListener(`keydown`, onErrorEscPress);
    };

    errorClose.addEventListener(`keydown`, function (evt) {
      window.util.onEnterPress(evt, closeError);
    });

    document.addEventListener(`keydown`, onErrorEscPress);
    document.addEventListener(`click`, closeError);
  };

  uploadStart.addEventListener(`change`, function () {
    openUpload();
  });

  uploadCancel.addEventListener(`click`, function () {
    closeUpload();
  });

  uploadCancel.addEventListener(`keydown`, function (evt) {
    window.util.onEnterPress(evt, closeUpload);
  });

  form.submitButton.addEventListener(`keydown`, function (evt) {
    window.util.onEnterPress(evt, closeUpload);
  });

})();
