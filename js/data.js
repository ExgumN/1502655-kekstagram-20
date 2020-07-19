'use strict';

(function () {
  // var USER_NAMES = ['Кот Бегемот', 'Кот Матроскин', 'Розовая Пантера', 'Кот Леопольд', 'Кекс', 'Гарфилд', 'Кот в Сапогах', 'Чеширский кот'];
  // var USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  // window.data = {
  //   USER_NAMES: USER_NAMES,
  //   USER_COMMENTS: USER_COMMENTS
  // };
  var renderFotoObjects = function (fotoObject) {
    var fragment = document.createDocumentFragment();
    var similarFotoElement = document.querySelector('.pictures');
    var fotoObjectTemplate = document.querySelector('#picture').content.querySelector('.picture');

    var renderFotoObject = function (fotoObject1) {
      var fotoElement = fotoObjectTemplate.cloneNode(true);
      fotoElement.querySelector('.picture__img').src = fotoObject1.url;
      // fotoElement.querySelector('.picture__img').dataset.index = fotoObject.ind;
      fotoElement.querySelector('.picture__likes').textContent = fotoObject1.likes;
      fotoElement.querySelector('.picture__comments').textContent = fotoObject1.comments.length;
      fotoElement.setAttribute('data-url', fotoObject1.url);
      fotoElement.addEventListener('click', window.preview.openBigFotoOnClickHandler);
      fotoElement.addEventListener('keydown', window.preview.openBigFotoKeydownHandler);
      return fotoElement;
    };

    for (var i2 = 0; i2 < fotoObject.length; i2++) {
      fragment.appendChild(renderFotoObject(fotoObject[i2]));
    }
    similarFotoElement.appendChild(fragment);
    // var fragment = document.createDocumentFragment();
    // for (var i2 = 0; i2 < fotoObjects.length; i2++) {
    //   fragment.appendChild(renderFotoObject(fotoObjects[i2]));
    // }
    // similarFotoElement.appendChild(fragment);
  };
  var loadSuccessHandler = function (photos) {
    window.data = photos;
    window.defaultData = photos;
    window.dataLength = window.data.length;
    renderFotoObjects(photos);
  };

  var loadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.classList.add('errorMessage');
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);

  };

  window.load(loadSuccessHandler, loadErrorHandler);

})();
