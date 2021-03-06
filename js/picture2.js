// модуль для отрисовки миниатюры
'use strict';

(function () {
  // var fotoObjects = [];
  var similarFotoElement = document.querySelector('.pictures');
  var fotoObjectTemplate = document.querySelector('#picture').content.querySelector('.picture');

  // функция генерации сообщения комментов
  // var generateMessage = function () {
  //   var count = window.functions.generateRandomValue(1, 2);
  //   var message = window.functions.selectRandomElement(window.data.USER_COMMENTS);
  //   if (count === 2) {
  //     message = message + ' ' + window.functions.selectRandomElement(window.data.USER_COMMENTS);
  //   }
  //   return message;
  // };
  // // функция генерации комментов
  // var generateComments = function (commentsCount) {
  //   var comments = [];
  //   for (var i = 0; i < commentsCount; i++) {
  //     comments.push({
  //       avatar: 'img/avatar-' + window.functions.generateRandomValue(1, 6) + '.svg',
  //       message: generateMessage(),
  //       name: window.functions.selectRandomElement(window.data.USER_NAMES)
  //     });
  //   }
  //   return (comments);
  // };
  // // функция генерации фото объектов
  // var generateFotoObject = function (num) {
  //   for (var i1 = 0; i1 < num; i1++) {
  //     fotoObjects[i1] = {
  //       url: 'photos/' + (i1 + 1) + '.jpg',
  //       description: 'Описание фотографии',
  //       likes: window.functions.generateRandomValue(15, 200),
  //       comments: generateComments(window.functions.generateRandomValue(1, 10)),
  //       ind: i1
  //     };
  //   }
  //   return (fotoObjects);
  // };
  // generateFotoObject(25);

  var renderFotoObject = function (fotoObject) {
    var fotoElement = fotoObjectTemplate.cloneNode(true);
    fotoElement.querySelector('.picture__img').src = fotoObject.url;
    // fotoElement.querySelector('.picture__img').dataset.index = fotoObject.ind;
    fotoElement.querySelector('.picture__likes').textContent = fotoObject.likes;
    fotoElement.querySelector('.picture__comments').textContent = fotoObject.comments.length;
    fotoElement.setAttribute('data-url', fotoObject.url);
    return fotoElement;
  };

  // var fragment = document.createDocumentFragment();
  // for (var i2 = 0; i2 < fotoObjects.length; i2++) {
  //   fragment.appendChild(renderFotoObject(fotoObjects[i2]));
  // }
  // similarFotoElement.appendChild(fragment);

  window.load(function (fotoObject) {
    var fragment = document.createDocumentFragment();
    for (var i2 = 0; i2 < fotoObject.length; i2++) {
      fragment.appendChild(renderFotoObject(fotoObject[i2]));
    }
    similarFotoElement.appendChild(fragment);
  }, function () {});

})();
