'use strict';

let initialPhotos;
let filteredPhotos;

const thumbnails = document.querySelector(`.pictures`);
const photoTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

const renderPhoto = (obj) => {
  const photo = photoTemplate.cloneNode(true);
  const image = photo.querySelector(`.picture__img`);
  const comments = photo.querySelector(`.picture__comments`);
  const likes = photo.querySelector(`.picture__likes`);

  image.src = obj.url;
  likes.textContent = obj.likes;
  comments.textContent = obj.comments.length;

  return photo;
};

const renderPhotos = (photosArray) => {
  const previousThumbnails = thumbnails.querySelectorAll(`.picture`);
  let fragment = document.createDocumentFragment();

  if (previousThumbnails) {
    previousThumbnails.forEach((thumbnail) => {
      thumbnail.parentNode.removeChild(thumbnail);
    });
  }

  photosArray.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  thumbnails.appendChild(fragment);
};

const onPictureEnterPress = (evt) => {
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
