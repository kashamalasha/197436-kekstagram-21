'use strict';

window.effects.form.effectLevelPin.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  const lineWidth = window.effects.form.effectLevelLine.clientWidth;
  let startCoords = {
    x: evt.clientX,
  };

  let isDragged = false;

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    isDragged = true;

    let shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };

    const pointerPosition = window.effects.form.effectLevelPin.offsetLeft - shift.x;

    if (pointerPosition >= 0) {
      if (pointerPosition === 0) {
        window.effects.form.effectLevelPin.style.left = `0`;
        window.effects.form.effectLevelDepth.style.width = `0`;
      } else if (pointerPosition <= lineWidth) {
        window.effects.form.effectLevelPin.style.left = `${pointerPosition}px`;
        window.effects.form.effectLevelDepth.style.width = `${pointerPosition}px`;
      }
      window.effects.onSetEffectIntencity(moveEvt);
    }
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    if (isDragged) {
      const onClickPreventDefault = (clickEvt) => {
        clickEvt.preventDefault();
        window.effects.form.effectLevelPin.removeEventListener(`click`, onClickPreventDefault);
      };
      window.effects.form.effectLevelPin.addEventListener(`click`, onClickPreventDefault);
    }
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
