'use strict';

(function () {

  const MOCK_COMMENTS = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];

  const MOCK_NAMES = [
    `Екатерина`,
    `Дмитрий`,
    `Даниил`,
    `Елена`,
    `Вера`,
    `Николай`,
    `Марина`,
    `Александра`
  ];

  let generateMockComments = function (quantity) {
    let arr = [];

    for (let i = 0; i < quantity; i++) {
      arr.push({
        avatar: `img/avatar-` + window.util.getRandomInt(1, 6) + `.svg`,
        message: window.util.getRandomFromArray(MOCK_COMMENTS),
        name: window.util.getRandomFromArray(MOCK_NAMES)
      });
    }

    return arr;
  };

  let generateMockPhotos = function (quantity) {
    let arr = [];

    for (let i = 1; i <= quantity; i++) {
      arr.push({
        url: `photos/` + i + `.jpg`,
        description: ``,
        likes: window.util.getRandomInt(15, 200),
        comments: generateMockComments(window.util.getRandomInt(1, 50))
      });
    }

    return arr;
  };

  window.data = {
    generateMockPhotos
  };

})();
