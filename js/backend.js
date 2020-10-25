'use strict';

(function () {

  const TIMEOUT = 10000;

  const StatusCode = {
    OK: 200
  };

  const Url = {
    SAVE: ``,
    LOAD: `https://21.javascript.pages.academy/kekstagram/data`
  };

  let createRequest = function (method, url, onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        default:
          onError(`Статус ответа: ${xhr.status} - ${xhr.statusText}`);
          break;
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(`Таймаут: ${xhr.timeout} мс.`);
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);

    return xhr;
  };

  let load = function (onSuccess, onError) {
    let xhr = createRequest(`GET`, Url.LOAD, onSuccess, onError);
    xhr.send();
  };

  let save = function (data, onSuccess, onError) {
    let xhr = createRequest(`POST`, Url.SAVE, onSuccess, onError);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };

})();
