'use strict';

(function () {
  let uploadDialog = document.querySelector(`#upload-file`);

  let imgUpload = document.querySelector(`.img-upload`);
  let uploadImgOverlay = document.querySelector(`.img-upload__overlay`);
  let uploadCancel = document.querySelector(`#upload-cancel`);

  let form = {
    hashtags: imgUpload.querySelector(`.text__hashtags`),
    description: imgUpload.querySelector(`.text__description`)
  };

  let onUploadEscPress = function (evt) {
    if (document.activeElement !== form.hashtags
        && document.activeElement !== form.description) {
      window.util.onEscPress(evt, closeUpload);
    }
  };

  let showUpload = function () {
    uploadImgOverlay.classList.remove(`hidden`);
    document.body.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onUploadEscPress);
  };

  let closeUpload = function () {
    uploadImgOverlay.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
    uploadDialog.value = ``;

    document.removeEventListener(`keydown`, onUploadEscPress);
  };

  uploadDialog.addEventListener(`change`, function () {
    showUpload();
  });

  uploadCancel.addEventListener(`click`, function () {
    closeUpload();
  });

  uploadCancel.addEventListener(`keydown`, function (evt) {
    window.util.onEnterPress(evt, closeUpload);
  });

})();
