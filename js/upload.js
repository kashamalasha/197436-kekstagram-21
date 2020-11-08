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
    scaleButtons: formUpload.querySelectorAll(`.img-upload__scale button`),
    submitButton: formUpload.querySelector(`.img-upload__submit`)
  };

  const onUploadEscPress = function (evt) {
    if (document.activeElement !== form.hashtags
        && document.activeElement !== form.description) {
      window.util.onEscPress(evt, closeUpload);
    }
  };

  const openUpload = function () {
    uploadImgOverlay.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);
    window.effects.form.effectSlider.classList.add(`hidden`);

    window.effects.setScaleFactor();
    window.effects.resetEffect();
    window.validate.clearValidity();
    window.effects.form.effectLevelValue.value = ``;

    form.effects.addEventListener(`change`, window.effects.onEffectsChange);
    form.hashtags.addEventListener(`input`, window.validate.clearValidity);
    document.addEventListener(`keydown`, onUploadEscPress);

    for (let button of form.scaleButtons) {
      button.addEventListener(`click`, window.effects.setScaleFactor);
    }

    formUpload.addEventListener(`submit`, onUploadFormSubmit);
  };

  const closeUpload = function () {
    uploadImgOverlay.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);

    uploadStart.value = ``;

    form.effects.removeEventListener(`change`, window.effects.onEffectsChange);
    form.hashtags.removeEventListener(`input`, window.validate.clearValidity);
    document.removeEventListener(`keydown`, onUploadEscPress);

    for (let button of form.scaleButtons) {
      button.removeEventListener(`click`, window.effects.setScaleFactor);
    }

    formUpload.removeEventListener(`submit`, onUploadFormSubmit);
  };

  const onUploadFormSubmit = function (evt) {
    evt.preventDefault();

    window.validate.checkHashtags();

    if (!form.hashtags.validity.valid) {
      form.hashtags.classList.add(`text--errors`);
    } else {
      window.backend.save(new FormData(formUpload), onUploadSuccess, onUploadError);
    }
  };

  const onUploadSuccess = function () {
    uploadCancel.click();
    window.popup.renderPopup(`success`);
  };

  const onUploadError = function (errorMessage) {
    uploadCancel.click();
    window.popup.renderPopup(`error`, errorMessage);
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
