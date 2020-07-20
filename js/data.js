'use strict';

(function () {
  var renderFotoObjects = function (fotoObject) {
    var fragment = document.createDocumentFragment();
    var similarFotoElement = document.querySelector('.pictures');
    var fotoObjectTemplate = document.querySelector('#picture').content.querySelector('.picture');

    var renderFotoObject = function (fotoObject1) {
      var fotoElement = fotoObjectTemplate.cloneNode(true);
      fotoElement.querySelector('.picture__img').src = fotoObject1.url;
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

  window.load.loadData(loadSuccessHandler, loadErrorHandler);

})();
