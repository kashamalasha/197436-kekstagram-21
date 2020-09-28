'use strict';

(function () {
  let pictureElement = document.querySelector(`.big-picture`);

  let renderText = function (element, data, text) {
    if (data) {
      element.textContent = text;
    } else {
      element.style.display = `none`;
    }
  };

  let renderComments = function (element, arr) {
    let comment = element.querySelector(`.social__comment`);
    let fragment = document.createDocumentFragment();

    if (arr.length > 5) {
      arr = arr.slice(0, 5);
    }

    for (let i = 0; i < arr.length; i++) {
      let record = comment.cloneNode(true);
      let avatar = record.querySelector(`.social__picture`);
      let message = record.querySelector(`.social__text`);

      avatar.src = arr[i].avatar;
      avatar.alt = arr[i].name;
      message.textContent = arr[i].message;

      fragment.appendChild(record);
    }

    window.domUtil.removeChildren(element);
    element.appendChild(fragment);
  };

  let renderPicture = function (data) {

    let image = pictureElement.querySelector(`.big-picture__img`).querySelector(`img`);
    let likesCount = pictureElement.querySelector(`.likes-count`);
    let commentsCount = pictureElement.querySelector(`.comments-count`);
    let comments = pictureElement.querySelector(`.social__comments`);
    let description = pictureElement.querySelector(`.social__caption`);

    image.src = data.url;
    renderText(likesCount, data.likes, data.likes);
    renderText(commentsCount, data.comments.length, data.comments.length);
    renderText(description, data.description, data.description);
    renderComments(comments, data.comments);

    pictureElement.classList.remove(`hidden`);

  };

  window.picture = {
    renderPicture
  };

})();
