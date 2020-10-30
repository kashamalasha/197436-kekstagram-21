'use strict';

(function () {
  let renderPopup = function (type, message, buttonTitle) {
    let popupTemplate = document.querySelector(`#${type}`)
      .content
      .querySelector(`.${type}`);

    let popupParent = document.querySelector(`main`);
    let popupElement = popupTemplate.cloneNode(true);

    let popup = {
      title: popupElement.querySelector(`.${type}__title`),
      button: popupElement.querySelector(`.${type}__button`)
    };

    if (message) {
      popup.title.textContent = message;
    }

    if (buttonTitle) {
      popup.button.textContent = buttonTitle;
    }

    let onPopupEscPress = function (evt) {
      window.util.onEscPress(evt, closePopup);
    };

    let closePopup = function (evt) {

      if (evt) {
        evt.preventDefault();
        if (evt.target.className === `${type}` ||
            evt.target.className === `${type}__button`) {
          popupParent.removeChild(popupElement);
        }
      } else {
        popupParent.removeChild(popupElement);
      }

      document.removeEventListener(`click`, closePopup);
      document.removeEventListener(`keydown`, onPopupEscPress);
    };

    popupParent.appendChild(popupElement);

    popup.button.focus();

    popup.button.addEventListener(`keydown`, function (evt) {
      window.util.onEnterPress(evt, closePopup);
    });

    document.addEventListener(`keydown`, onPopupEscPress);
    document.addEventListener(`click`, closePopup);
  };

  window.popup = {
    renderPopup
  };

})();

