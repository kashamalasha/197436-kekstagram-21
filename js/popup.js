'use strict';

const renderPopup = (type, message, buttonTitle) => {
  const popupTemplate = document.querySelector(`#${type}`)
      .content
      .querySelector(`.${type}`);

  const popupParent = document.querySelector(`main`);
  const popupElement = popupTemplate.cloneNode(true);

  const popup = {
    title: popupElement.querySelector(`.${type}__title`),
    button: popupElement.querySelector(`.${type}__button`)
  };

  if (message) {
    popup.title.textContent = message;
  }

  if (buttonTitle) {
    popup.button.textContent = buttonTitle;
  }

  const onPopupEscPress = (evt) => {
    window.util.onEscPress(evt, onPopupCloseClick);
  };

  const onPopupCloseClick = (evt) => {

    if (evt && type === `error`) {
      evt.preventDefault();
      if (evt.target.className === `${type}` ||
            evt.target.className === `${type}__button`) {
        popupParent.removeChild(popupElement);
      } else {
        return;
      }
    } else {
      popupParent.removeChild(popupElement);
    }

    document.removeEventListener(`click`, onPopupCloseClick);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  popupParent.appendChild(popupElement);

  popup.button.focus();

  popup.button.addEventListener(`keydown`, function (evt) {
    window.util.onEnterPress(evt, onPopupCloseClick);
  });

  document.addEventListener(`keydown`, onPopupEscPress);
  document.addEventListener(`click`, onPopupCloseClick);
};

window.popup = {
  renderPopup
};

