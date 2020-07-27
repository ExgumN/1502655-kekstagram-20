'use strict';

(function () {
  var RANDOM_IMAGES_AMOUNT = 10;
  var CONST_FOR_SORT_IMG = 0.5;
  var renderFotoObjects = window.debounce.debounce(function (fotoObject) {
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
    filterImages();
  });

  var filterImages = function () {
    var filters = document.querySelector('.img-filters');
    var filterButtons = document.querySelectorAll('.img-filters__form button');
    filters.classList.remove('img-filters--inactive');

    var deleteImages = function () {
      var images = document.querySelectorAll('a.picture');
      for (var i = 0; i < images.length; i++) {
        images[i].remove();
      }
    };

    var displayRandomImages = window.debounce.debounce(function () {
      var images = window.data
        .slice()
        .sort(function () {
          return Math.random() - CONST_FOR_SORT_IMG;
        })
        .slice(0, RANDOM_IMAGES_AMOUNT);
      renderFotoObjects(images);
    });

    var displayDiscussedImages = window.debounce.debounce(function () {
      var images = window.data
        .slice()
        .sort(function (a, b) {
          return b.comments.length - a.comments.length;
        });
      renderFotoObjects(images);
    });
    var changeBorderFilterButtons = function (evt) {
      for (var i = 0; i < filterButtons.length; i++) {
        if (filterButtons[i] !== evt.target) {
          filterButtons[i].classList.remove('img-filters__button--active');
        }
      }

      evt.target.classList.toggle('img-filters__button--active');
    };
    var getFilter = function (evt) {
      evt.preventDefault();
      deleteImages();

      var buttonId = evt.target.id;
      switch (buttonId) {
        case 'filter-random':
          displayRandomImages();
          break;
        case 'filter-discussed':
          displayDiscussedImages();
          break;
        case 'filter-default':
          renderFotoObjects(window.data);
          break;
      }
      changeBorderFilterButtons(evt);
    };

    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].addEventListener('click', getFilter);
    }
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

  window.backend.loadData(loadSuccessHandler, loadErrorHandler);

})();
