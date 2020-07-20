'use strict';
(function () {
  var SUCCESS_STATUS = 200;
  var TIMEOUT = 10000;
  var URL = 'https://javascript.pages.academy/kekstagram/data';
  var loadData = function (onSuccess, onError) {
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

    xhr.timeout = TIMEOUT; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };
  var uploadData = function (data, onLoad, onError) {
    if (TIMEOUT === 10000) {
      onLoad();
    } else {
      onError();
    }
    // var xhr = new XMLHttpRequest();

    // xhr.responseType = 'json';

    // xhr.addEventListener('load', function () {
    //   if (xhr.status === SUCCESS_STATUS) {
    //     onLoad(xhr.response);
    //   } else {
    //     onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    //   }
    // });

    // xhr.addEventListener('error', function () {
    //   onError('Ошибка соединения');
    // });
    // xhr.open('POST', URL);
    // xhr.send(data);
  };
  window.load = {
    loadData: loadData,
    uploadData: uploadData
  };
})();


