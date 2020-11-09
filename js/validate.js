'use strict';

(function () {
  const HASHTAG_REGEX = /^#[a-zA-Zа-яА-Я|\d]+$/;

  const HashtagParams = {
    MAX_TAGS: 5,
    MIN_LENGTH: 1,
    MAX_LENGTH: 20
  };

  const imgUpload = document.querySelector(`.img-upload`);
  const hashtagInput = imgUpload.querySelector(`.text__hashtags`);

  const hasDuplicates = (arr) => {
    return new Set(arr).size !== arr.length;
  };

  const checkHashtags = () => {
    if (hashtagInput.value) {
      const tags = hashtagInput.value.trim().toLowerCase().split(` `);
      if (tags.length > HashtagParams.MAX_TAGS) {
        hashtagInput.setCustomValidity(`Количество хэштэгов не должно превышать 5`);
      } else if (hasDuplicates(tags)) {
        hashtagInput.setCustomValidity(`Хэштэги не должны повторяться`);
      } else {
        tags.forEach((tag) => {
          if (tag.length === HashtagParams.MIN_LENGTH) {
            hashtagInput.setCustomValidity(`Длина хэштэга "${tag}" не должна быть меньше ${HashtagParams.MIN_LENGTH}`);
          } else if (tag.length > HashtagParams.MAX_LENGTH) {
            hashtagInput.setCustomValidity(`Длина хэштэга "${tag}" не должна быть больше ${HashtagParams.MAX_LENGTH}`);
          } else if (!HASHTAG_REGEX.test(tag)) {
            hashtagInput.setCustomValidity(`Хэштэг "${tag}" не соответствует правилам оформления`);
          }
        });
      }
    } else {
      hashtagInput.setCustomValidity(``);
    }
    hashtagInput.reportValidity();
  };

  const clearHashtagValidity = () => {
    hashtagInput.setCustomValidity(``);
    hashtagInput.reportValidity();
    hashtagInput.classList.remove(`text--errors`);
  };

  window.validate = {
    checkHashtags,
    clearHashtagValidity
  };

})();
