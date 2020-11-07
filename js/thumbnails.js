'use strict';

(function () {
  let initialPhotos;
  let filteredPhotos;

  let thumbnails = document.querySelector(`.pictures`);
  let photoTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  const renderPhoto = function (obj) {
    let photo = photoTemplate.cloneNode(true);
    let image = photo.querySelector(`.picture__img`);
    let comments = photo.querySelector(`.picture__comments`);
    let likes = photo.querySelector(`.picture__likes`);

    image.src = obj.url;
    likes.textContent = obj.likes;
    comments.textContent = obj.comments.length;

    return photo;
  };

  const renderPhotos = function (arr) {
    let fragment = document.createDocumentFragment();
    let previousThumbnails = thumbnails.querySelectorAll(`.picture`);

    if (previousThumbnails) {
      for (let thumbnail of previousThumbnails) {
        thumbnail.parentNode.removeChild(thumbnail);
      }
    }

    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPhoto(arr[i]));
    }

    thumbnails.appendChild(fragment);
  };

  const onPictureEnterPress = function (evt) {
    evt.preventDefault();
    if (evt.target.className === `picture`) {
      window.picture.showPreview(evt.target,
          window.thumbnails.filteredPhotos ? window.thumbnails.filteredPhotos : window.thumbnails.initialPhotos);
    }
  };

  thumbnails.addEventListener(`click`, function (evt) {
    if (evt.target.className === `picture__img`) {
      window.picture.showPreview(evt.target.parentNode,
          window.thumbnails.filteredPhotos ? window.thumbnails.filteredPhotos : window.thumbnails.initialPhotos);
    }
  });

  thumbnails.addEventListener(`keydown`, function (evt) {
    window.util.onEnterPress(evt, onPictureEnterPress);
  });

  window.thumbnails = {
    initialPhotos,
    filteredPhotos,
    renderPhotos
  };
})();
