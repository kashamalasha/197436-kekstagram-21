'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`, `bmp`];

const uploadStart = document.querySelector(`#upload-file`);
const uploadImgOverlay = document.querySelector(`.img-upload__overlay`);
const uploadCancel = document.querySelector(`#upload-cancel`);
const imgUpload = document.querySelector(`.img-upload`);
const formUpload = imgUpload.querySelector(`.img-upload__form`);
const uploadPreview = imgUpload.querySelector(`.img-upload__preview img`);
const effectsPreview = uploadImgOverlay.querySelectorAll(`.effects__preview`);

const form = {
  hashtags: formUpload.querySelector(`.text__hashtags`),
  description: formUpload.querySelector(`.text__description`),
  effects: formUpload.querySelector(`.img-upload__effects`),
  scaleButtons: formUpload.querySelectorAll(`.img-upload__scale button`),
  submitButton: formUpload.querySelector(`.img-upload__submit`)
};

const onUploadEscPress = (evt) => {
  if (document.activeElement !== form.hashtags
        && document.activeElement !== form.description) {
    window.util.onEscPress(evt, closeUpload);
  }
};

const openUpload = () => {
  uploadImgOverlay.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);
  window.effects.form.effectSlider.classList.add(`hidden`);

  window.effects.setScaleFactor();
  window.effects.resetEffect();
  window.validate.clearHashtagValidity();
  window.effects.form.effectLevelValue.value = ``;

  form.effects.addEventListener(`change`, window.effects.onEffectsChange);
  form.hashtags.addEventListener(`input`, onHashtagInputChange);
  document.addEventListener(`keydown`, onUploadEscPress);

  form.scaleButtons.forEach((button) => {
    button.addEventListener(`click`, onScaleButtonClick);
  });

  formUpload.addEventListener(`submit`, onUploadFormSubmit);
};

const closeUpload = () => {
  uploadImgOverlay.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);

  uploadStart.value = ``;

  form.effects.removeEventListener(`change`, window.effects.onEffectsChange);
  form.hashtags.removeEventListener(`input`, onHashtagInputChange);
  document.removeEventListener(`keydown`, onUploadEscPress);

  form.scaleButtons.forEach((button) => {
    button.removeEventListener(`click`, onScaleButtonClick);
  });

  formUpload.removeEventListener(`submit`, onUploadFormSubmit);
};

const onHashtagInputChange = () => window.validate.clearHashtagValidity();
const onScaleButtonClick = (evt) => window.effects.setScaleFactor(evt);

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();

  window.validate.checkHashtags();

  if (!form.hashtags.validity.valid) {
    form.hashtags.classList.add(`text--errors`);
  } else {
    window.backend.save(new FormData(formUpload), onUploadSuccess, onUploadError);
  }
};

const onUploadSuccess = () => {
  uploadCancel.click();
  window.popup.renderPopup(`success`);
};

const onUploadError = (errorMessage) => {
  uploadCancel.click();
  window.popup.renderPopup(`error`, errorMessage);
};

uploadStart.addEventListener(`change`, function () {
  const file = uploadStart.files[0];
  const matches = FILE_TYPES.some((type) => file.type.endsWith(type));
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      uploadPreview.src = reader.result;

      effectsPreview.forEach((effect) => {
        effect.style.backgroundImage = `url('${reader.result}')`;
      });
    });

    reader.readAsDataURL(file);
    openUpload();
  }
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
