'use strict';

(function () {

  const HASHTAG_REGEX = /^#[a-zA-Z]+$/;
  const HashtagParams = {
    MAX_TAGS: 5,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20
  };

  let imgUpload = document.querySelector(`.img-upload`);

  let form = {
    hashtags: imgUpload.querySelector(`.text__hashtags`)
  };

  let hasDuplicates = function (arr) {
    return new Set(arr).size !== arr.length;
  };

  let checkHashtags = function () {
    let tags = form.hashtags.value.trim().toLowerCase().split(` `);

    if (tags) {
      if (tags.length > HashtagParams.MAX_TAGS) {
        form.hashtags.setCustomValidity(`Количество хэштэгов не должно превышать 5`);
      } else if (hasDuplicates(tags)) {
        form.hashtags.setCustomValidity(`Хэштэги не должны повторяться`);
      } else {
        for (let tag of tags) {
          if (!HASHTAG_REGEX.test(tag)) {
            form.hashtags.setCustomValidity(`Хэштэг "` + tag + `" не соответствует правилам оформления`);
          } else if (tag.length === HashtagParams.MIN_LENGTH) {
            form.hashtags.setCustomValidity(`Длина хэштэга "` + tag + `" не должна быть меньше ` + HashtagParams.MIN_LENGTH);
          } else if (tag.length > HashtagParams.MAX_LENGTH + 1) {
            form.hashtags.setCustomValidity(`Длина хэштэга "` + tag + `" не должна быть больше ` + HashtagParams.MAX_LENGTH);
          }
        }
      }
    } else {
      form.hashtags.setCustomValidity(``);
    }
    form.hashtags.reportValidity();
  };

  let clearValidity = function () {
    form.hashtags.setCustomValidity(``);
    form.hashtags.reportValidity();
  };

  window.validate = {
    checkHashtags,
    clearValidity
  };

})();