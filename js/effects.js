// модуль работы с эффектами
'use strict';

(function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
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
  window.effects = {
    effectPin: effectPin,
    effectDepth: effectDepth,
    effects: effects
  };
})();
