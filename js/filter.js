'use strict';

(function () {
  const RANDOM_PHOTO_QUANTITY = 10;

  const filterForm = document.querySelector(`.img-filters__form`);

  const getFilteredPhotos = (filterType) => {
    const checkedButton = filterForm.querySelector(`.img-filters__button--active`);
    const activeFilter = filterForm.querySelector(`#${filterType}`);

    checkedButton.classList.remove(`img-filters__button--active`);
    activeFilter.classList.add(`img-filters__button--active`);

    switch (filterType) {
      case `filter-random`:
        const randomArray = window.util.getShuffledArray(window.thumbnails.initialPhotos);
        return randomArray.slice(0, RANDOM_PHOTO_QUANTITY);
      case `filter-discussed`:
        return window.thumbnails.initialPhotos.slice().sort(function (left, right) {
          return right.comments.length - left.comments.length;
        });
      default:
        return window.thumbnails.initialPhotos;
    }
  };

  const filterPhotos = window.util.debounce((evt) => {
    window.thumbnails.filteredPhotos = getFilteredPhotos(evt.target.id);
    window.thumbnails.renderPhotos(window.thumbnails.filteredPhotos);
  });

  const show = () => {
    filterForm.parentElement.classList.remove(`img-filters--inactive`);
    filterForm.addEventListener(`click`, function (evt) {
      filterPhotos(evt);
    });
  };

  window.filter = {
    show
  };

})();
