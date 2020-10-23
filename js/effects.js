'use strict';

(function () {

  let imgUpload = document.querySelector(`.img-upload`);

  let form = {
    imgUploadPreview: imgUpload.querySelector(`.img-upload__preview img`),
    effectSlider: imgUpload.querySelector(`.img-upload__effect-level`),
    effectLevelPin: imgUpload.querySelector(`.effect-level__pin`),
    effectLevelLine: imgUpload.querySelector(`.effect-level__line`),
    effectLevelDepth: imgUpload.querySelector(`.effect-level__depth`)
  };

  let getCurrentPinPosition = function () {
    let position = {
      width: form.effectLevelLine.clientWidth,
      depth: form.effectLevelDepth.clientWidth
    };
    return position.depth / position.width;
  };

  let setMaxPinPosition = function () {
    let maxPinPosition = form.effectLevelLine.clientWidth;
    window.effects.form.effectLevelPin.style.left = maxPinPosition + `px`;
    window.effects.form.effectLevelDepth.style.width = maxPinPosition + `px`;
  };

  let setEffectIntencity = function () {
    let pinPosition = getCurrentPinPosition();
    let fraction = pinPosition.toFixed(1);
    let percent = (pinPosition.toFixed(2) * 100) + `%`;
    let pixel = (3 / 100) * (pinPosition.toFixed(2) * 100) + `px`;

    switch (true) {
      case form.imgUploadPreview.classList.contains(`effects__preview--chrome`):
        form.imgUploadPreview.style.filter = `grayscale(` + fraction + `)`;
        break;
      case form.imgUploadPreview.classList.contains(`effects__preview--sepia`):
        form.imgUploadPreview.style.filter = `sepia(` + fraction + `)`;
        break;
      case form.imgUploadPreview.classList.contains(`effects__preview--marvin`):
        form.imgUploadPreview.style.filter = `invert(` + percent + `)`;
        break;
      case form.imgUploadPreview.classList.contains(`effects__preview--phobos`):
        form.imgUploadPreview.style.filter = `blur(` + pixel + `)`;
        break;
      case form.imgUploadPreview.classList.contains(`effects__preview--heat`):
        form.imgUploadPreview.style.filter = `brightness(` + fraction + `)`;
        break;
      default:
        form.imgUploadPreview.style.filter = ``;
    }
  };

  let resetEffect = function () {
    form.imgUploadPreview.className = ``;
    form.imgUploadPreview.style.filter = ``;
  };

  let setEffectStyle = function (target) {
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
    }
    form.effectLevelPin.addEventListener(`mouseup`, setEffectIntencity);
  };

  let onEffectsChange = function (evt) {
    setEffectStyle(evt.target);
    setMaxPinPosition();
    setEffectIntencity();
  };

  window.effects = {
    form,
    onEffectsChange,
    setEffectIntencity
  };

})();
