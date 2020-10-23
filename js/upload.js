'use strict';

(function () {
  let uploadDialog = document.querySelector(`#upload-file`);

  let uploadImgOverlay = document.querySelector(`.img-upload__overlay`);
  let uploadCancel = document.querySelector(`#upload-cancel`);
  let imgUpload = document.querySelector(`.img-upload`);

  let form = {
    hashtags: imgUpload.querySelector(`.text__hashtags`),
    description: imgUpload.querySelector(`.text__description`),
    effects: imgUpload.querySelector(`.img-upload__effects`),
    scaleValue: imgUpload.querySelector(`.img-upload__scale input`),
    scaleButtons: imgUpload.querySelectorAll(`.img-upload__scale button`)
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
  };

  let closeUpload = function () {
    uploadImgOverlay.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    uploadDialog.value = ``;

    form.effects.removeEventListener(`change`, window.effects.onEffectChange);
    form.hashtags.removeEventListener(`blur`, window.validate.checkHashtags);
    form.hashtags.removeEventListener(`input`, window.validate.clearValidity);
    document.removeEventListener(`keydown`, onUploadEscPress);

    for (let button of form.scaleButtons) {
      button.removeEventListener(`click`, window.effects.setScaleFactor);
    }
  };

  uploadDialog.addEventListener(`change`, function () {
    openUpload();
  });

  uploadCancel.addEventListener(`click`, function () {
    closeUpload();
  });

  uploadCancel.addEventListener(`keydown`, function (evt) {
    window.util.onEnterPress(evt, closeUpload);
  });

})();
