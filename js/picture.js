'use strict';

const VISIBLE_COMMENTS_COUNTER_REGEX = /^\d+/;
const DEFAULT_COMMENTS_QUANTITY = 5;

const pictureElement = document.querySelector(`.big-picture`);
const comments = pictureElement.querySelector(`.social__comments`);
const commentsLoader = pictureElement.querySelector(`.social__comments-loader`);
const visibleCommentsCounter = pictureElement.querySelector(`.social__comment-count`);

const onShowMoreCommentsClick = () => {

  const hiddenComments = comments.querySelectorAll(`.hidden`);
  const currentVisibleCounter = parseInt(visibleCommentsCounter.innerHTML.match(VISIBLE_COMMENTS_COUNTER_REGEX)[0], 10);

  if (hiddenComments.length) {
    const cutoff = hiddenComments.length < DEFAULT_COMMENTS_QUANTITY ? hiddenComments.length : DEFAULT_COMMENTS_QUANTITY;

    for (let i = 0; i < cutoff; i++) {
      hiddenComments[i].classList.remove(`hidden`);
    }

    if (cutoff < DEFAULT_COMMENTS_QUANTITY) {
      commentsLoader.classList.add(`hidden`);
    }

    visibleCommentsCounter.innerHTML = visibleCommentsCounter.innerHTML.replace(VISIBLE_COMMENTS_COUNTER_REGEX, currentVisibleCounter + cutoff);
  }
};

const renderComments = (commentsArray) => {
  const commentElement = comments.querySelector(`.social__comment`);
  let fragment = document.createDocumentFragment();

  commentsArray.forEach((comment, index) => {
    const record = commentElement.cloneNode(true);
    const avatar = record.querySelector(`.social__picture`);
    const message = record.querySelector(`.social__text`);

    avatar.src = comment.avatar;
    avatar.alt = comment.name;
    message.textContent = comment.message;

    if (index >= DEFAULT_COMMENTS_QUANTITY) {
      record.classList.add(`hidden`);
    }

    fragment.appendChild(record);
  });

  if (commentsArray.length < DEFAULT_COMMENTS_QUANTITY) {
    const commentsCount = pictureElement.querySelector(`.comments-count`).textContent;
    visibleCommentsCounter.innerHTML = visibleCommentsCounter.innerHTML.replace(VISIBLE_COMMENTS_COUNTER_REGEX, commentsCount);
    commentsLoader.classList.add(`hidden`);
  } else {
    visibleCommentsCounter.innerHTML = visibleCommentsCounter.innerHTML.replace(VISIBLE_COMMENTS_COUNTER_REGEX, DEFAULT_COMMENTS_QUANTITY);
    commentsLoader.classList.remove(`hidden`);
  }

  commentsLoader.addEventListener(`click`, onShowMoreCommentsClick);
  commentsLoader.addEventListener(`keydown`, onShowMoreCommentsEnterPress);

  comments.innerHTML = ``;
  comments.appendChild(fragment);
};

const renderPicture = (data) => {

  const image = pictureElement.querySelector(`.big-picture__img img`);
  const likesCount = pictureElement.querySelector(`.likes-count`);
  const commentsCount = pictureElement.querySelector(`.comments-count`);
  const description = pictureElement.querySelector(`.social__caption`);
  const closeModal = pictureElement.querySelector(`.big-picture__cancel`);

  image.src = data.url;
  likesCount.textContent = data.likes;
  commentsCount.textContent = data.comments.length;
  description.textContent = data.description;
  renderComments(data.comments);

  document.body.classList.add(`modal-open`);
  pictureElement.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPictureEscPress);
  closeModal.addEventListener(`click`, onPictureCloseClick);
};

const showPreview = (thumbnail, data) => {
  const container = document.querySelector(`.pictures`);
  const collection = container.querySelectorAll(`.picture`);

  for (let i = 0; i <= collection.length; i++) {
    if (collection[i] === thumbnail) {
      renderPicture(data[i]);
      break;
    }
  }
};

const onPictureCloseClick = () => {
  pictureElement.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
};

const onPictureEscPress = (evt) => {
  window.util.onEscPress(evt, onPictureCloseClick);
};

const onShowMoreCommentsEnterPress = (evt) => {
  window.util.onEnterPress(evt, onShowMoreCommentsClick);
};

window.picture = {
  showPreview
};
