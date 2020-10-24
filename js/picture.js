'use strict';

(function () {
  let pictureElement = document.querySelector(`.big-picture`);


  let renderComments = function (arr) {
    let comments = pictureElement.querySelector(`.social__comments`);
    let comment = comments.querySelector(`.social__comment`);
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

    comments.innerHTML = ``;
    comments.appendChild(fragment);
  };

  let renderPicture = function (data) {

    let image = pictureElement.querySelector(`.big-picture__img img`);
    let likesCount = pictureElement.querySelector(`.likes-count`);
    let commentsCount = pictureElement.querySelector(`.comments-count`);
    let description = pictureElement.querySelector(`.social__caption`);
    let closeModal = pictureElement.querySelector(`.big-picture__cancel`);

    image.src = data.url;
    likesCount.textContent = data.likes;
    commentsCount.textContent = data.comments.length;
    description.textContent = data.description;
    renderComments(data.comments);

    document.body.classList.add(`modal-open`);

    pictureElement.querySelector(`.social__comment-count`).classList.add(`hidden`);
    pictureElement.querySelector(`.comments-loader`).classList.add(`hidden`);
    pictureElement.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPictureEscPress);
    closeModal.addEventListener(`click`, closePicture);
  };

  let showPreview = function (thumbnail, data) {
    const REGEX = /(\d+)/;

    let photoSrc = thumbnail.getAttribute(`src`);
    let photoNum = photoSrc.match(REGEX)[0];

    renderPicture(data[photoNum - 1]);
  };

  let closePicture = function () {
    pictureElement.classList.add(`hidden`);
    pictureElement.classList.remove(`modal-open`);
  };

  let onPictureEscPress = function (evt) {
    window.util.onEscPress(evt, closePicture);
  };

  window.picture = {
    showPreview
  };

})();
