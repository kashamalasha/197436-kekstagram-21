'use strict';

(function () {
  const VISIBLE_COUNTER_REGEX = /^\d+/;

  let pictureElement = document.querySelector(`.big-picture`);
  let comments = pictureElement.querySelector(`.social__comments`);
  let commentsLoader = pictureElement.querySelector(`.social__comments-loader`);
  let visibleCommentsCounter = pictureElement.querySelector(`.social__comment-count`);

  const showMoreComments = function () {
    const CUTOFF_DEFAULT = 5;

    let hiddenComments = comments.querySelectorAll(`.hidden`);
    let currentVisibleCounter = parseInt(visibleCommentsCounter.innerHTML.match(VISIBLE_COUNTER_REGEX)[0], 10);

    if (hiddenComments.length) {
      let cutoff = hiddenComments.length < CUTOFF_DEFAULT ? hiddenComments.length : CUTOFF_DEFAULT;

      for (let i = 0; i < cutoff; i++) {
        hiddenComments[i].classList.remove(`hidden`);
      }

      if (cutoff < CUTOFF_DEFAULT) {
        commentsLoader.classList.add(`hidden`);
      }

      visibleCommentsCounter.innerHTML = visibleCommentsCounter.innerHTML.replace(VISIBLE_COUNTER_REGEX, currentVisibleCounter + cutoff);
    }
  };

  const renderComments = function (arr) {
    let comment = comments.querySelector(`.social__comment`);
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < arr.length; i++) {
      let record = comment.cloneNode(true);
      let avatar = record.querySelector(`.social__picture`);
      let message = record.querySelector(`.social__text`);

      avatar.src = arr[i].avatar;
      avatar.alt = arr[i].name;
      message.textContent = arr[i].message;

      if (i >= 5) {
        record.classList.add(`hidden`);
      }

      fragment.appendChild(record);
    }

    if (arr.length < 5) {
      let commentsCount = pictureElement.querySelector(`.comments-count`).textContent;
      visibleCommentsCounter.innerHTML = visibleCommentsCounter.innerHTML.replace(VISIBLE_COUNTER_REGEX, commentsCount);
      commentsLoader.classList.add(`hidden`);
    } else {
      commentsLoader.classList.remove(`hidden`);
    }

    commentsLoader.addEventListener(`click`, showMoreComments);
    commentsLoader.addEventListener(`keydown`, onShowMoreCommentsEnterPress);

    comments.innerHTML = ``;
    comments.appendChild(fragment);
  };

  const renderPicture = function (data) {

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
    pictureElement.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPictureEscPress);
    closeModal.addEventListener(`click`, closePicture);
  };

  const showPreview = function (thumbnail, data) {
    let container = document.querySelector(`.pictures`);
    let collection = container.querySelectorAll(`.picture`);

    for (let i = 0; i <= collection.length; i++) {
      if (collection[i] === thumbnail) {
        renderPicture(data[i]);
        break;
      }
    }
  };

  const closePicture = function () {
    pictureElement.classList.add(`hidden`);
    document.body.classList.remove(`modal-open`);
  };

  const onPictureEscPress = function (evt) {
    window.util.onEscPress(evt, closePicture);
  };

  const onShowMoreCommentsEnterPress = function (evt) {
    window.util.onEnterPress(evt, showMoreComments);
  };

  window.picture = {
    showPreview
  };

})();
