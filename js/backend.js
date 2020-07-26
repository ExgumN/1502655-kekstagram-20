'use strict';
(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;
  var loadData = function (onSuccess, onError) {
    var URL = 'https://javascript.pages.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };
  var uploadData = function (data, onLoad, onError) {
    var URL = 'https://javascript.pages.academy/kekstagram';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };
  window.backend = {
    loadData: loadData,
    uploadData: uploadData
  };
})();


