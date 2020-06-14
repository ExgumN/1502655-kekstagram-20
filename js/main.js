'use strict';
var USER_NAMES = ['Кот Бегемот', 'Кот Матроскин', 'Розовая Пантера', 'Кот Леопольд', 'Кекс', 'Гарфилд', 'Кот в Сапогах', 'Чеширский кот'];
var USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var fotoObjects = [];
var similarFotoElement = document.querySelector('.pictures');
var fotoObjectTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
// функция генерация случайного целого числа в диапазоне от min до max включительно
var generateRandomValue = function (min, max) {
  var randomValue = Math.round(Math.random() * (max - min) + min);
  return randomValue;
};
// функция генерации сообщения комментов
var generateMessage = function () {
  var count = generateRandomValue(1, 2);
  var message = USER_COMMENTS[generateRandomValue(0, 5)];
  if (count === 2) {
    message = message + ' ' + USER_COMMENTS[generateRandomValue(0, 5)];
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
      name: USER_NAMES[generateRandomValue(0, 7)]
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
