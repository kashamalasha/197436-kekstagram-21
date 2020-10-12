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
    let hashtagArr = form.hashtags.value.trim().toLowerCase().split(` `);

    if (hashtagArr.length > HashtagParams.MAX_TAGS) {
      form.hashtags.setCustomValidity(`Количество хэштэгов не должно превышать 5`);
      form.hashtags.reportValidity();
    } else if (hasDuplicates(hashtagArr)) {
      form.hashtags.setCustomValidity(`Хэштэги не должны повторяться`);
      form.hashtags.reportValidity();
    } else {
      for (let tag of hashtagArr) {
        if (!HASHTAG_REGEX.test(tag)) {
          form.hashtags.setCustomValidity(`Хэштэг "` + tag + `" не соответствует правилам оформления`);
          form.hashtags.reportValidity();
        } else if (tag.length === HashtagParams.MIN_LENGTH) {
          form.hashtags.setCustomValidity(`Длина хэштэга "` + tag + `" не должна быть меньше ` + HashtagParams.MIN_LENGTH);
          form.hashtags.reportValidity();
        } else if (tag.length > HashtagParams.MAX_LENGTH + 1) {
          form.hashtags.setCustomValidity(`Длина хэштэга "` + tag + `" не должна быть больше ` + HashtagParams.MAX_LENGTH);
          form.hashtags.reportValidity();
        }
      }
    }
  };

  window.validate = {
    checkHashtags
  };

})();
