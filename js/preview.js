// модуль для отрисовки большого изображения
'use strict';

(function () {
  var similarCommentElement = document.querySelector('.social__comments');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var socialCommentsCountShown = document.querySelector('.comments-count-shown');
  var buttonCommentsLoader = bigPicture.querySelector('button.comments-loader');
  var socialCommentsCount = document.querySelector('.social__comment-count');
  var STEP_COMMENT = 5;

  var getComment = function (photo) {
    var commentElement = bigPicture.querySelector('.social__comment').cloneNode(true);
    commentElement.querySelector('img').src = photo.avatar;
    commentElement.querySelector('img').alt = photo.name;
    commentElement.querySelector('.social__text').textContent = photo.message;
    return commentElement;
  };
  var getHiddenComment = function (photo) {
    var commentElement = bigPicture.querySelector('.social__comment').cloneNode(true);
    commentElement.querySelector('img').src = photo.avatar;
    commentElement.querySelector('img').alt = photo.name;
    commentElement.querySelector('.social__text').textContent = photo.message;
    commentElement.classList.add('hidden');
    return commentElement;
  };
  var showHiddenComments = function () {
    var hiddenComments = document.querySelectorAll('.social__comment.hidden');

    for (var i = 0; i < Math.min(STEP_COMMENT, hiddenComments.length); i++) {
      hiddenComments[i].classList.remove('hidden');
      socialCommentsCountShown.textContent++;
    }

    if (hiddenComments.length <= STEP_COMMENT) {
      buttonCommentsLoader.classList.add('hidden');
    }
  };
  var fillBigPictureInfo = function (photoSrc) {
    socialCommentsCountShown.textContent = 5;
    var photo = window.data.slice().filter(function (el) {
      return el.url === photoSrc;
    })[0];
    bigPicture.classList.remove('hidden');
    bigPictureImg.querySelector('img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;

    var fragment2 = document.createDocumentFragment();
    for (var j1 = 0; j1 < photo.comments.length; j1++) {
      if (j1 < STEP_COMMENT) {
        fragment2.appendChild(getComment(photo.comments[j1]));
      } else {
        fragment2.appendChild(getHiddenComment(photo.comments[j1]));
      }
    }
    similarCommentElement.innerHTML = '';
    similarCommentElement.appendChild(fragment2);
    if (photo.comments.length > 5) {
      buttonCommentsLoader.classList.remove('hidden');
      socialCommentsCount.classList.remove('hidden');
      buttonCommentsLoader.addEventListener('click', showHiddenComments);
    } else {
      buttonCommentsLoader.classList.add('hidden');
      socialCommentsCount.classList.add('hidden');
    }
  };

  var onPopupEscPress = function (evt) {
    window.functions.isEscEvent(evt, closeBigPicture);
  };

  var openBigPicture = function (evt) {
    var photos = document.querySelectorAll('a.picture');
    for (var i = 0; i < photos.length; i++) {
      if (evt.target.src.indexOf(photos[i].dataset.url) !== -1) {
        fillBigPictureInfo(photos[i].dataset.url);
        break;
      }
    }
  };
  var openBigPictureModal = function () {
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    bigPictureClose.addEventListener('click', function () {
      closeBigPicture(bigPicture);
    });
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };
  var openBigFotoOnClickHandler = function (evt) {
    evt.preventDefault();
    openBigPicture(evt);
    openBigPictureModal();
  };
  var openBigFotoKeydownHandler = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Enter') {
      openBigFotoOnClickHandler(evt);
    }
  };
  window.preview = {
    openBigFotoOnClickHandler: openBigFotoOnClickHandler,
    openBigFotoKeydownHandler: openBigFotoKeydownHandler
  };
})();

