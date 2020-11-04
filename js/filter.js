'use strict';

(function () {
  const RANDOM_PHOTO_QUANTITY = 10;
  let filterForm = document.querySelector(`.img-filters__form`);

  const getPhotos = function (photosArray, filterType) {
    let checkedButton = filterForm.querySelector(`.img-filters__button--active`);
    let activeFilter = filterForm.querySelector(`#${filterType}`);

    checkedButton.classList.remove(`img-filters__button--active`);
    activeFilter.classList.add(`img-filters__button--active`);

    switch (filterType) {
      case `filter-random`:
        let randomArray = window.util.getShuffledArray(photosArray);
        return randomArray.slice(0, RANDOM_PHOTO_QUANTITY);
      case `filter-discussed`:
        return photosArray.slice().sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
      default:
        return photosArray;
    }
  };

  const showFilters = function (arr) {
    filterForm.parentElement.classList.remove(`img-filters--inactive`);
    filterForm.addEventListener(`click`, function (evt) {
      window.thumbnails.renderPhotos(
          getPhotos(arr, evt.target.id));
    });
  };

  window.filter = {
    showFilters
  };

})();
