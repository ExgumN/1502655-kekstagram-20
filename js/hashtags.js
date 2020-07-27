// модуль валидации хэштегов
'use strict';

(function () {
  // валидация хэштегов
  var HasgtagRegExp1 = /^#[a-zа-яёA-ZА-ЯЁ\d]+/; // true
  var HasgtagRegExp2 = /[^a-zа-яёA-ZА-ЯЁ\d#]/; // false
  var hashtags = document.querySelector('.text__hashtags');
  var maxHashtagsCnt = 5;
  var maxHashtagsLength = 20;
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadButton = document.querySelector('.img-upload__submit');
  var bannedKeys = ['#', ' ', 'Backspace', 'Control', 'Alt', 'Enter', 'CapsLock', 'Tab', 'Shift', 'Delete'];
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
    if ((hashtags.value.length === 0 || hashtags.value.substr(-1) === ' ') && bannedKeys.indexOf(evt.key) === -1) {
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
  // проверка длинны
  var checkLength = function (array) {
    for (var i4 = 0; i4 < array.length; i4++) {
      if (array[i4].length > maxHashtagsLength) {
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

  window.hashtags = {
    hashtags: hashtags
  };
})();
