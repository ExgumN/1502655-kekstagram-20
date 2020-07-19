// модуль для отрисовки большого изображения
'use strict';

(function () {
  var similarCommentElement = document.querySelector('.social__comments');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  // var bigPicturesOpen = document.querySelectorAll('.picture');

  // var getComment = function (commentObject) {
  //   var commentElement = bigPicture.querySelector('.social__comment').cloneNode(true);
  //   commentElement.querySelector('img').src = commentObject.avatar;
  //   commentElement.querySelector('img').alt = commentObject.name;
  //   commentElement.querySelector('.social__text').textContent = commentObject.message;
  //   return commentElement;
  // };
  var getComment = function (photo) {
    for (var j = 0; j < photo.comments.length; j++) {
      var commentElement = bigPicture.querySelector('.social__comment').cloneNode(true);
      commentElement.querySelector('img').src = photo.comments[j].avatar;
      commentElement.querySelector('img').alt = photo.comments[j].name;
      commentElement.querySelector('.social__text').textContent = photo.comments[j].message;
      similarCommentElement.appendChild(commentElement);
    }
  };
  // функция заполнения большой фото инфой
  // var fillBigPictureInfo = function (object) {
  //   bigPictureImg.querySelector('img').src = object.url;
  //   bigPicture.querySelector('.likes-count').textContent = object.likes;
  //   bigPicture.querySelector('.comments-count').textContent = object.comments.length;
  //   bigPicture.querySelector('.social__caption').textContent = object.description;

  //   var fragment2 = document.createDocumentFragment();
  //   for (var j1 = 0; j1 < object.comments.length; j1++) {
  //     fragment2.appendChild(getComment(object.comments[j1]));
  //   }
  //   similarCommentElement.innerHTML = '';
  //   similarCommentElement.appendChild(fragment2);
  // };


  var fillBigPictureInfo = function (photoSrc) {
    var photo = window.data.slice().filter(function (el) {
      return el.url === photoSrc;
    })[0];
    bigPicture.classList.remove('hidden');
    bigPictureImg.querySelector('img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    getComment(photo);
  };
  var onPopupEscPress = function (evt) {
    window.functions.isEscEvent(evt, closeBigPicture);
  };
  // var openBigPicture = function (index) {
  //   fillBigPictureInfo(window.data[index]);
  //   bigPicture.classList.remove('hidden');
  //   document.querySelector('body').classList.add('modal-open');
  //   document.addEventListener('keydown', onPopupEscPress);
  // };
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
    //bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    //bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPictureClose.addEventListener('click', function () {
      closeBigPicture(bigPicture);
    });
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };


  // for (var i7 = 0; i7 < bigPicturesOpen.length; i7++) {
  //   bigPicturesOpen[i7].addEventListener('click', function (evt) {
  //     if (evt.target.className === 'picture' || evt.target.className === 'picture__img') {
  //       //openBigPicture(evt.target.dataset.index);
  //       openBigPicture();
  //     }
  //   });
  // }

  // for (var i8 = 0; i8 < bigPicturesOpen.length; i8++) {
  //   bigPicturesOpen[i8].addEventListener('keydown', function (evt) {
  //     if (evt.key === 'Enter') {
  //       if (evt.target.className === 'picture' || evt.target.className === 'picture__img') {
  //         openBigPicture(evt.target.children[0].dataset.index);
  //       }
  //     }
  //   });
  // }
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

