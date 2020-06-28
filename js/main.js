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
var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

var effects = document.querySelectorAll('.effects__radio');
var effectLine = document.querySelector('.effect-level__line');
var effectPin = effectLine.querySelector('.effect-level__pin');
var effectDepth = effectLine.querySelector('.effect-level__depth');
var effectValue = document.querySelector('.effect-level__value');
var effectsDescription = [
  {
    name: 'none',
    filter: ''
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1
  },
  {
    name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1
  },
  {
    name: 'marvin',
    filter: 'invert',
    start: 100,
    min: 0,
    max: 100,
    unit: '%'
  },
  {
    name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    unit: 'px'
  },
  {
    name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3
  }
];

var uploadFile = document.querySelector('#upload-file');
var uploadClose = document.querySelector('#upload-cancel');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadForm = document.querySelector('.img-upload__form');
var uploadButton = document.querySelector('.img-upload__submit');

var defaultEffect = 0; // порядковый номер эффекта по умолчанию
var HasgtagRegExp1 = /^#[a-zа-яёA-ZА-ЯЁ\d]+/; // true
var HasgtagRegExp2 = /[^a-zа-яёA-ZА-ЯЁ\d#]/; // false

var comment = document.querySelector('.text__description');
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
  for (var i1 = 0; i1 < num; i1++) {
    // var j = i1 + 1;
    fotoObjects[i1] = {
      url: 'photos/' + (i1 + 1) + '.jpg',
      description: 'Описание фотографии',
      likes: generateRandomValue(15, 200),
      comments: generateComments(generateRandomValue(1, 10)),
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

var getComment = function (commentObject) {
  var commentElement = bigPicture.querySelector('.social__comment').cloneNode(true);
  commentElement.querySelector('img').src = commentObject.avatar;
  commentElement.querySelector('img').alt = commentObject.name;
  commentElement.querySelector('.social__text').textContent = commentObject.message;
  return commentElement;
};
var bigPicturesOpen = document.querySelectorAll('.picture');

// функция заполнения большой фото инфой
var fillBigPictureInfo = function (object) {
  bigPictureImg.querySelector('img').src = object.url;
  bigPicture.querySelector('.likes-count').textContent = object.likes;
  bigPicture.querySelector('.comments-count').textContent = object.comments.length;
  bigPicture.querySelector('.social__caption').textContent = object.description;

  var fragment2 = document.createDocumentFragment();
  for (var j1 = 0; j1 < object.comments.length; j1++) {
    fragment2.appendChild(getComment(object.comments[j1]));
  }
  similarCommentElement.innerHTML = '';
  similarCommentElement.appendChild(fragment2);
};

// fillBigPictureInfo(fotoObjects[1]);

// функция нажатия на Esc
var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && hashtags !== document.activeElement && comment !== document.activeElement) {
    evt.preventDefault();
    closeUploadOverlay();
    closeBigPicture();
  }
};


var openModal = function (target) {
  target.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscPress);
};

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

var openBigPicture = function (index) {
  fillBigPictureInfo(fotoObjects[index]);
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
};

for (var i7 = 0; i7 < bigPicturesOpen.length; i7++) {
  bigPicturesOpen[i7].addEventListener('click', function (evt) {
    if (evt.target.className === 'picture' || evt.target.className === 'picture__img') {
      openBigPicture(evt.target.dataset.index);
    }
  });
}

for (var i8 = 0; i8 < bigPicturesOpen.length; i8++) {
  bigPicturesOpen[i8].addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      if (evt.target.className === 'picture' || evt.target.className === 'picture__img') {
        openBigPicture(evt.target.children[0].dataset.index);
      }
    }
  });
}

bigPictureClose.addEventListener('click', function () {
  closeBigPicture(bigPicture);
});

// доверяй, но проверяй (часть 1)
// загрузка изображения
uploadFile.addEventListener('change', function () {
  effectPin.style.left = '100%';
  effectDepth.style.width = '100%';
  imgUploadPreview.style.filter = '';
  scaleControlValue.value = defaultControlValue + '%';
  imgUploadPreview.style.transform = 'scale' + '(' + defaultControlValue / 100 + ')';
  effectPin.classList.add('hidden');
  hashtags.value = '';
  effects[defaultEffect].checked = true;
  openModal(uploadOverlay);

});

var closeUploadOverlay = function () {
  uploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscPress);
};

uploadClose.addEventListener('click', function () {
  closeUploadOverlay();
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

// наложение эффектов
// действия при изменении фильтра
var numFilter;
var changeFilter = function () {
  for (var k = 0; k < effects.length; k++) {
    if (effects[k].checked) {
      numFilter = k;
    }
  }
  effectPin.style.left = '100%';
  effectDepth.style.width = '100%';
  imgUploadPreview.style.filter = '';
  effectPin.classList.add('hidden');
  if (numFilter !== 0) {
    var filterValue = effectsDescription[numFilter].max;
    if (effectsDescription[numFilter].unit) {
      filterValue += effectsDescription[numFilter].unit;
    }
    imgUploadPreview.style.filter = effectsDescription[numFilter].filter + '(' + filterValue + ')';
    effectPin.classList.remove('hidden');
  }
};
// добавление обработчика на изменение фильтра
for (var j2 = 0; j2 < effects.length; j2++) {
  effects[j2].addEventListener('change', changeFilter);
}
// перемещение слайдера
var movePin = function (evt) {
  var min = 0;
  var max = effectLine.offsetWidth;

  var pinX = effectPin.offsetLeft + evt.movementX;
  if (pinX < min) {
    pinX = min;
  }
  if (pinX > max) {
    pinX = max;
  }
  effectPin.style.left = pinX + 'px';
  effectDepth.style.width = pinX + 'px';
  var newValue = Math.round(pinX / effectLine.offsetWidth * 100);
  effectValue.setAttribute('value', newValue);

  var filterValue = effectValue.value * (effectsDescription[numFilter].max - effectsDescription[numFilter].min) / 100 + effectsDescription[numFilter].min;
  if (effectsDescription[numFilter].unit) {
    filterValue += effectsDescription[numFilter].unit;
  }
  imgUploadPreview.style.filter = effectsDescription[numFilter].filter + '(' + filterValue + ')';
  return filterValue;
};
var mouseUp = function () {
  document.removeEventListener('mousemove', movePin);
};
effectPin.addEventListener('mousedown', function () {
  document.addEventListener('mousemove', movePin);
  document.addEventListener('mouseup', mouseUp);
});

// валидация хэштегов
var hashtags = document.querySelector('.text__hashtags');
var maxHashtagsCnt = 5;
// функция создания массива хэштегов
var getHashtagsArray = function (str) {
  var hashtagArray = str.value.split(' ');
  return hashtagArray;
};

hashtags.addEventListener('click', function () {
  if (hashtags.value.length === 0 || hashtags.value.substr(-1) === ' ') {
    hashtags.value += '#';
  }
});
hashtags.addEventListener('keydown', function (evt) {
  if (evt.key === '#' && hashtags.value.substr(-1) !== ' ') {
    evt.preventDefault();
  }
  if (evt.key === ' ') {
    evt.preventDefault();
  }
  if (evt.key === ' ' && hashtags.value.substr(-1) === ' ') {
    evt.preventDefault();
    hashtags.value += '#';
  }
  if (evt.key === ' ' && hashtags.value.substr(-1) !== '#' && hashtags.value.substr(-1) !== ' ' && getHashtagsArray(hashtags).length < maxHashtagsCnt) {
    evt.preventDefault();
    hashtags.value += ' #';
  }
  if ((hashtags.value.length === 0 || hashtags.value.substr(-1) === ' ') && evt.key !== '#' && evt.key !== ' ' && evt.key !== 'Backspace' && evt.key !== 'Control' && evt.key !== 'Alt' && evt.key !== 'Enter' && evt.key !== 'CapsLock' && evt.key !== 'Tab' && evt.key !== 'Shift' && evt.key !== 'Delete') {
    evt.preventDefault();
    hashtags.value += '#' + evt.key;
  }
});
// проверка на пробел в конце
var checkSpace = function (str) {
  if (typeof str.value !== 'undefined') {
    if (str.value.substr(-1) === ' ') {
      str = str.value.substr(0, str.value.length - 1);
    }
  }
  return str;
};
// проверка дублей по регистру:
var checkReg = function (array) {
  for (var i3 = 0; i3 < array.length; i3++) {
    for (var j3 = i3 + 1; j3 < array.length; j3++) {
      if (array[i3].toLowerCase() === array[j3].toLowerCase() || array[i3].toLowerCase() === array[j3].toLowerCase() + ' ') {
        return false;
      }
    }
  }
  return true;
};
// проверка длины
var checkLength = function (array) {
  for (var i4 = 0; i4 < array.length; i4++) {
    if (array[i4].length > 20) {
      return false;
    }
  }
  return true;
};
// проверка наличия пустых хештегов
var checkEmpty = function (array) {
  for (var i5 = 0; i5 < array.length; i5++) {
    if (array[i5].length === 0 || array[i5] === '#') {
      return false;
    }
  }
  return true;
};

// функция проверки хештега
var checkHashtags = function () {
  if (hashtags.value.length > 0) {
    var hashtagsArray = getHashtagsArray(checkSpace(hashtags));
    hashtags.setCustomValidity('');
    for (var i6 = 0; i6 < hashtagsArray.length; i6++) {
      if (!HasgtagRegExp1.test(hashtagsArray[i6]) || HasgtagRegExp2.test(hashtagsArray[i6])) {
        hashtags.setCustomValidity('Можно использовать только буквы и цифры');
      }
    }
    if (!checkEmpty(hashtagsArray)) {
      hashtags.setCustomValidity('Найден пустой хештег или есть пробел в конце строки');
    }
    if (!checkLength(getHashtagsArray(hashtags))) {
      hashtags.setCustomValidity('Максимальная длина хэштега 20 символов (Включая #)');
    }
    if (!checkReg(getHashtagsArray(hashtags))) {
      hashtags.setCustomValidity('Найдены одинаковые хэштеги, проверьте регистр');
    }
  }
};
uploadForm.addEventListener('input', checkHashtags);
uploadButton.addEventListener('click', checkHashtags);
