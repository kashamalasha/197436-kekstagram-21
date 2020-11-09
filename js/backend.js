'use strict';

(function () {

  const TIMEOUT = 10000;

  const StatusCode = {
    OK: 200
  };

  const Url = {
    SAVE: `https://21.javascript.pages.academy/kekstagram`,
    LOAD: `https://21.javascript.pages.academy/kekstagram/data`
  };

  const createRequest = (method, url, onLoad, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        default:
          onError(`Статус ответа: ${xhr.status} - ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Таймаут: ${xhr.timeout} мс.`);
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);

    return xhr;
  };

  const load = (onSuccess, onError) => {
    let xhr = createRequest(`GET`, Url.LOAD, onSuccess, onError);
    xhr.send();
  };

  const save = (data, onSuccess, onError) => {
    let xhr = createRequest(`POST`, Url.SAVE, onSuccess, onError);
    xhr.send(data);
  };

  window.backend = {
    load,
    save
  };

})();
