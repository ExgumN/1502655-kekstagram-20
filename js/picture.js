// модуль для отрисовки миниатюры
'use strict';

(function () {
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
      // fotoElement.setAttribute('data-url', fotoObject1.url);
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
  window.picture = {
    renderFotoObjects: renderFotoObjects
  };
})();
