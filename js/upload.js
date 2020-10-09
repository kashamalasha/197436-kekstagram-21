'use strict';

(function () {
  let uploadDialog = document.querySelector(`#upload-file`);

  let uploadImgOverlay = document.querySelector(`.img-upload__overlay`);
  let uploadCancel = document.querySelector(`#upload-cancel`);
  let imgUpload = document.querySelector(`.img-upload`);

  let form = {
    hashtags: imgUpload.querySelector(`.text__hashtags`),
    description: imgUpload.querySelector(`.text__description`),
    effects: imgUpload.querySelector(`.img-upload__effects`)
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

    form.effects.addEventListener(`change`, window.effects.onEffectsChange);
    document.addEventListener(`keydown`, onUploadEscPress);
  };

  let closeUpload = function () {
    uploadImgOverlay.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    uploadDialog.value = ``;

    form.effects.removeEventListener(`change`, window.effects.onEffectChange);
    document.removeEventListener(`keydown`, onUploadEscPress);
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
