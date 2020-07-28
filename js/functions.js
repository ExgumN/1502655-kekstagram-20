'use strict';
// модуль с функциями
window.functions = (function () {
  var ESC_KEYCODE = 27;
  var comment = document.querySelector('.text__description');
  return {
    generateRandomValue: function (min, max) {
      var randomValue = Math.round(Math.random() * (max - min) + min);
      return randomValue;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE && window.hashtags.hashtags !== document.activeElement
                                      && comment !== document.activeElement) {
        action();
      }
    },
    // функция выборки случайного элемента из массива
    selectRandomElement: function (array) {
      return array[window.functions.generateRandomValue(0, array.length - 1)];
    }
  };
})();

