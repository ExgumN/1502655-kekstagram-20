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

bigPictureImg.querySelector('img').src = fotoObjects[0].url;
bigPicture.querySelector('.likes-count').textContent = fotoObjects[0].likes;
bigPicture.querySelector('.comments-count').textContent = fotoObjects[0].comments.length;
bigPicture.querySelector('.social__caption').textContent = fotoObjects[0].description;

var getComment = function (commentObject) {
  var commentElement = bigPicture.querySelector('.social__comment').cloneNode(true);
  commentElement.querySelector('img').src = commentObject.avatar;
  commentElement.querySelector('img').alt = commentObject.name;
  commentElement.querySelector('.social__text').textContent = commentObject.message;
  return commentElement;
};
var fragment2 = document.createDocumentFragment();
for (var j = 0; j < fotoObjects[0].comments.length; j++) {
  fragment2.appendChild(getComment(fotoObjects[0].comments[j]));
}
similarCommentElement.innerHTML = '';
similarCommentElement.appendChild(fragment2);

bigPicture.classList.remove('hidden');
bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
document.body.classList.add('modal-open');
