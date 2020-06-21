'use strict';
var USER_NAMES = ['Кот Бегемот', 'Кот Матроскин', 'Розовая Пантера', 'Кот Леопольд', 'Кекс', 'Гарфилд', 'Кот в Сапогах', 'Чеширский кот'];
var USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var fotoObjects = [];
var similarFotoElement = document.querySelector('.pictures');
var similarCommentElement = document.querySelector('.social__comments');
var fotoObjectTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var bigPicture = document.querySelector('.big-picture');
var bigPictureImg = document.querySelector('.big-picture__img');

// функция генерация случайного целого числа в диапазоне от min до max включительно
var generateRandomValue = function (min, max) {
  var randomValue = Math.round(Math.random() * (max - min) + min);
  return randomValue;
};
// функция генерации сообщения комментов
var generateMessage = function () {
  var count = generateRandomValue(1, 2);
  var message = USER_COMMENTS[generateRandomValue(0, USER_COMMENTS.length - 1)];
  if (count === 2) {
    message = message + ' ' + USER_COMMENTS[generateRandomValue(0, USER_COMMENTS.length - 1)];
  }
  return message;
};
// функция генерации комментов
var generateComments = function (commentsCount) {
  var comments = [];
  for (var i = 0; i < commentsCount; i++) {
    comments[i] = {
      avatar: 'img/avatar-' + generateRandomValue(1, 6) + '.svg',
      message: generateMessage(),
      name: USER_NAMES[generateRandomValue(0, USER_NAMES.length - 1)]
    };
  }
  return (comments);
};
// функция генерации фото объектов
var generateFotoObject = function (num) {
  for (var i = 0; i < num; i++) {
    var j = i + 1;
    fotoObjects[i] = {
      url: 'photos/' + j + '.jpg',
      description: 'Описание фотографии',
      likes: generateRandomValue(15, 200),
      comments: generateComments(generateRandomValue(1, 10))
    };
  }
  return (fotoObjects);
};
generateFotoObject(25);

var renderFotoObject = function (fotoObject) {
  var fotoElement = fotoObjectTemplate.cloneNode(true);
  fotoElement.querySelector('.picture__img').src = fotoObject.url;
  fotoElement.querySelector('.picture__likes').textContent = fotoObject.likes;
  fotoElement.querySelector('.picture__comments').textContent = fotoObject.comments.length;
  return fotoElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < fotoObjects.length; i++) {
  fragment.appendChild(renderFotoObject(fotoObjects[i]));
}
similarFotoElement.appendChild(fragment);

var getComment = function (commentObject) {
  var commentElement = bigPicture.querySelector('.social__comment').cloneNode(true);
  commentElement.querySelector('img').src = commentObject.avatar;
  commentElement.querySelector('img').alt = commentObject.name;
  commentElement.querySelector('.social__text').textContent = commentObject.message;
  return commentElement;
};
// функция заполнения большой фото инфой
var fillBigPictureInfo = function (object) {
  bigPictureImg.querySelector('img').src = object.url;
  bigPicture.querySelector('.likes-count').textContent = object.likes;
  bigPicture.querySelector('.comments-count').textContent = object.comments.length;
  bigPicture.querySelector('.social__caption').textContent = object.description;
  var fragment2 = document.createDocumentFragment();
  for (var j = 0; j < object.comments.length; j++) {
    fragment2.appendChild(getComment(object.comments[j]));
  }
  similarCommentElement.innerHTML = '';
  similarCommentElement.appendChild(fragment2);
};

fillBigPictureInfo(fotoObjects[0]);
var bigPictureOpen = document.querySelector('.picture');
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
var onPopupEscPress = function (target) {
  return function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeBigPicture(target);
    }
  };
};
var openBigPicture = function (target) {
  target.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress(target));
};

var closeBigPicture = function (target) {
  target.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscPress(target));
};

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

bigPictureOpen.addEventListener('click', function () {
  openBigPicture(bigPicture);
});
bigPictureClose.addEventListener('click', function () {
  closeBigPicture(bigPicture);
});

// доверяй, но проверяй (часть 1)
// загрузка изображения
var uploadFile = document.querySelector('#upload-file');
var uploadClose = document.querySelector('#upload-cancel');
var uploadOverlay = document.querySelector('.img-upload__overlay');

uploadFile.addEventListener('change', function () {
  openBigPicture(uploadOverlay);
});

uploadClose.addEventListener('click', function () {
  closeBigPicture(uploadOverlay);
  uploadFile.value = '';
});

// изменение размера изображения
var scaleControlBigger = uploadOverlay.querySelector('.scale__control--bigger');
var scaleControlSmaller = uploadOverlay.querySelector('.scale__control--smaller');
var scaleControlValue = uploadOverlay.querySelector('.scale__control--value');
var imgUploadPreview = document.querySelector('.img-upload__preview img');
var defaultControlValue = 100;
var step = 25;
// установка размера по умолчанию
scaleControlValue.value = defaultControlValue + '%';
imgUploadPreview.style.transform = 'scale' + '(' + defaultControlValue / 100 + ')';

var changeImgSize = function (stp) {
  var imgSize = parseInt(scaleControlValue.value, 10);
  imgSize += stp;
  if (imgSize > 100) {
    imgSize = 100;
  } else if (imgSize < 25) {
    imgSize = 25;
  }
  imgUploadPreview.style.transform = 'scale' + '(' + imgSize / 100 + ')';
  return imgSize;
};
scaleControlSmaller.addEventListener('click', function () {
  scaleControlValue.value = changeImgSize(-step) + '%';
});

scaleControlBigger.addEventListener('click', function () {
  scaleControlValue.value = changeImgSize(step) + '%';
});

