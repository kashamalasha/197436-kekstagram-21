'use strict';

(function () {

  const MOCK_QUANTIY = 25;

  let photosArray = window.data.generateMockPhotos(MOCK_QUANTIY);
  let picturesElement = document.querySelector(`.pictures`);

  let photoTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  let renderPhoto = function (obj) {
    let photo = photoTemplate.cloneNode(true);
    let image = photo.querySelector(`.picture__img`);
    let comments = photo.querySelector(`.picture__comments`);
    let likes = photo.querySelector(`.picture__likes`);

    image.src = obj.url;
    likes.textContent = obj.likes;
    comments.textContent = obj.comments.length;

    return photo;
  };

  let renderPhotos = function (arr) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < arr.length; i++) {
      fragment.appendChild(renderPhoto(arr[i]));
    }

    return fragment;
  };

  picturesElement.appendChild(renderPhotos(photosArray));
  window.picture.renderPicture(photosArray[0]);

})();
