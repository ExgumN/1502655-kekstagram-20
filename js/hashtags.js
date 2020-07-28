// модуль валидации хэштегов
'use strict';

(function () {
  // валидация хэштегов
  var HASHTAG_REG_EXP_1 = /^#[a-zа-яёA-ZА-ЯЁ\d]+/; // true
  var HASHTAG_REG_EXP_2 = /[^a-zа-яёA-ZА-ЯЁ\d#]/; // false
  var hashtags = document.querySelector('.text__hashtags');
  var MAX_HASHTAGS_CNT = 5;
  var MAX_HASHTAGS_LENGTH = 20;
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadButton = document.querySelector('.img-upload__submit');
  var BANNED_KEYS = ['#', ' ', 'Backspace', 'Control', 'Alt', 'Enter', 'CapsLock', 'Tab', 'Shift', 'Delete'];
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
    if (evt.key === ' ' && hashtags.value.substr(-1) !== '#' && hashtags.value.substr(-1) !== ' ' && getHashtagsArray(hashtags).length < MAX_HASHTAGS_CNT) {
      evt.preventDefault();
      hashtags.value += ' #';
    }
    if ((hashtags.value.length === 0 || hashtags.value.substr(-1) === ' ') && BANNED_KEYS.indexOf(evt.key) === -1) {
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
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[i].toLowerCase() === array[j].toLowerCase() || array[i].toLowerCase() === array[j].toLowerCase() + ' ') {
          return false;
        }
      }
    }
    return true;
  };
  // проверка длинны
  var checkLength = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].length > MAX_HASHTAGS_LENGTH) {
        return false;
      }
    }
    return true;
  };
  // проверка наличия пустых хештегов
  var checkEmpty = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].length === 0 || array[i] === '#') {
        return false;
      }
    }
    return true;
  };

  // функция проверки хештега
  var hashtagsCheckHandler = function () {
    if (hashtags.value.length > 0) {
      var hashtagsArray = getHashtagsArray(checkSpace(hashtags));
      hashtags.setCustomValidity('');
      for (var i = 0; i < hashtagsArray.length; i++) {
        if (!HASHTAG_REG_EXP_1.test(hashtagsArray[i]) || HASHTAG_REG_EXP_2.test(hashtagsArray[i])) {
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
  uploadForm.addEventListener('input', hashtagsCheckHandler);
  uploadButton.addEventListener('click', hashtagsCheckHandler);

  window.hashtags = {
    hashtags: hashtags
  };
})();
