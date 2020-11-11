'use strict';

const SCALE_FACTOR_REGEX = /(\d+)/;
const Zoom = {
  STEP: 25,
  LIMIT: 100
};

const imgUpload = document.querySelector(`.img-upload`);
const form = {
  imgUploadPreview: imgUpload.querySelector(`.img-upload__preview img`),
  effectSlider: imgUpload.querySelector(`.img-upload__effect-level`),
  effectLevelPin: imgUpload.querySelector(`.effect-level__pin`),
  effectLevelLine: imgUpload.querySelector(`.effect-level__line`),
  effectLevelDepth: imgUpload.querySelector(`.effect-level__depth`),
  effectLevelValue: imgUpload.querySelector(`.effect-level__value`),
  scaleValue: imgUpload.querySelector(`.scale__control--value`)
};

const setScaleFactor = (evt) => {
  let value = parseInt(form.scaleValue.value.match(SCALE_FACTOR_REGEX)[0], 10);

  if (evt) {
    switch (true) {
      case evt.target.classList.contains(`scale__control--bigger`):
        value += Zoom.STEP;
        break;
      case evt.target.classList.contains(`scale__control--smaller`):
        value -= Zoom.STEP;
        break;
    }
  } else {
    value = Zoom.LIMIT;
  }

  if (value > Zoom.LIMIT) {
    value = Zoom.LIMIT;
  } else if (value < Zoom.STEP) {
    value = Zoom.STEP;
  }

  form.scaleValue.value = `${value} %`;
  form.imgUploadPreview.style.transform = `scale(${value / 100})`;
};

const getCurrentPinPosition = () => {
  const position = {
    width: form.effectLevelLine.clientWidth,
    depth: form.effectLevelDepth.clientWidth
  };
  return position.depth / position.width;
};

const setMaxPinPosition = () => {
  const maxPinPosition = form.effectLevelLine.clientWidth;
  form.effectLevelPin.style.left = `${maxPinPosition}px`;
  form.effectLevelDepth.style.width = `${maxPinPosition}px`;
  form.effectLevelValue.value = `100`;
};

const onSetEffectIntencity = () => {
  const pinPosition = getCurrentPinPosition();
  const percentValue = (pinPosition.toFixed(2) * 100);
  const intervalZeroOne = pinPosition.toFixed(1);
  const intervalZeroThree = (3 / 100) * (pinPosition.toFixed(2) * 100);
  const intervalOneThree = (2 / 100) * (pinPosition.toFixed(2) * 100) + 1;

  switch (true) {
    case form.imgUploadPreview.classList.contains(`effects__preview--chrome`):
      form.imgUploadPreview.style.filter = `grayscale(${intervalZeroOne})`;
      break;
    case form.imgUploadPreview.classList.contains(`effects__preview--sepia`):
      form.imgUploadPreview.style.filter = `sepia(${intervalZeroOne})`;
      break;
    case form.imgUploadPreview.classList.contains(`effects__preview--marvin`):
      form.imgUploadPreview.style.filter = `invert(${percentValue}%)`;
      break;
    case form.imgUploadPreview.classList.contains(`effects__preview--phobos`):
      form.imgUploadPreview.style.filter = `blur(${intervalZeroThree}px)`;
      break;
    case form.imgUploadPreview.classList.contains(`effects__preview--heat`):
      form.imgUploadPreview.style.filter = `brightness(${intervalOneThree})`;
      break;
    default:
      form.imgUploadPreview.style.filter = ``;
  }

  form.effectLevelValue.value = percentValue;
};

const resetEffect = () => {
  form.imgUploadPreview.className = ``;
  form.imgUploadPreview.style.filter = ``;
};

const setEffectStyle = (target) => {
  switch (true) {
    case target.matches(`#effect-chrome`):
      resetEffect();
      form.effectSlider.classList.remove(`hidden`);
      form.imgUploadPreview.classList.add(`effects__preview--chrome`);
      break;
    case target.matches(`#effect-sepia`):
      resetEffect();
      form.effectSlider.classList.remove(`hidden`);
      form.imgUploadPreview.classList.add(`effects__preview--sepia`);
      break;
    case target.matches(`#effect-marvin`):
      resetEffect();
      form.effectSlider.classList.remove(`hidden`);
      form.imgUploadPreview.classList.add(`effects__preview--marvin`);
      break;
    case target.matches(`#effect-phobos`):
      resetEffect();
      form.effectSlider.classList.remove(`hidden`);
      form.imgUploadPreview.classList.add(`effects__preview--phobos`);
      break;
    case target.matches(`#effect-heat`):
      resetEffect();
      form.effectSlider.classList.remove(`hidden`);
      form.imgUploadPreview.classList.add(`effects__preview--heat`);
      break;
    default:
      resetEffect();
      form.effectSlider.classList.add(`hidden`);
      form.effectLevelValue.value = ``;
  }
  form.effectLevelPin.addEventListener(`mouseup`, onSetEffectIntencity);
};

const onEffectsChange = (evt) => {
  setEffectStyle(evt.target);
  setMaxPinPosition();
  onSetEffectIntencity();
};

window.effects = {
  form,
  onEffectsChange,
  onSetEffectIntencity,
  setScaleFactor,
  resetEffect
};
