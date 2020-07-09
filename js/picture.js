// модуль для отрисовки миниатюры
'use strict';

(function () {
  var fotoObjects = [];
  var similarFotoElement = document.querySelector('.pictures');
  var fotoObjectTemplate = document.querySelector('#picture').content.querySelector('.picture');
  // функция генерации сообщения комментов
  var generateMessage = function () {
    var count = window.functions.generateRandomValue(1, 2);
    var message = window.data.USER_COMMENTS[window.functions.generateRandomValue(0, window.data.USER_COMMENTS.length - 1)];
    if (count === 2) {
      message = message + ' ' + window.data.USER_COMMENTS[window.functions.generateRandomValue(0, window.data.USER_COMMENTS.length - 1)];
    }
    return message;
  };
  // функция генерации комментов
  var generateComments = function (commentsCount) {
    var comments = [];
    for (var i = 0; i < commentsCount; i++) {
      comments[i] = {
        avatar: 'img/avatar-' + window.functions.generateRandomValue(1, 6) + '.svg',
        message: generateMessage(),
        name: window.data.USER_NAMES[window.functions.generateRandomValue(0, window.data.USER_NAMES.length - 1)]
      };
    }
    return (comments);
  };
  // функция генерации фото объектов
  var generateFotoObject = function (num) {
    for (var i1 = 0; i1 < num; i1++) {
      // var j = i1 + 1;
      fotoObjects[i1] = {
        url: 'photos/' + (i1 + 1) + '.jpg',
        description: 'Описание фотографии',
        likes: window.functions.generateRandomValue(15, 200),
        comments: generateComments(window.functions.generateRandomValue(1, 10)),
        ind: i1
      };
    }
    return (fotoObjects);
  };
  generateFotoObject(25);

  var renderFotoObject = function (fotoObject) {
    var fotoElement = fotoObjectTemplate.cloneNode(true);
    fotoElement.querySelector('.picture__img').src = fotoObject.url;
    fotoElement.querySelector('.picture__img').dataset.index = fotoObject.ind;
    fotoElement.querySelector('.picture__likes').textContent = fotoObject.likes;
    fotoElement.querySelector('.picture__comments').textContent = fotoObject.comments.length;
    return fotoElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i2 = 0; i2 < fotoObjects.length; i2++) {
    fragment.appendChild(renderFotoObject(fotoObjects[i2]));
  }
  similarFotoElement.appendChild(fragment);


  window.picture = {
    fotoObjects: fotoObjects
  };
})();
