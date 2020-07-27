// модуль загрузки изображения
'use strict';

(function () {
  var defaultEffect = 0; // порядковый номер эффекта по умолчанию
  var uploadFile = document.querySelector('#upload-file');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var uploadForm = document.querySelector('.img-upload__form');

  var onPopupEscPress = function (evt) {
    window.functions.isEscEvent(evt, closeUploadOverlay);
  };

  var openModal = function (target) {
    target.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };
  var resetModalSettings = function () {
    window.effects.effectPin.style.left = '100%';
    window.effects.effectDepth.style.width = '100%';
    imgUploadPreview.style.filter = '';
    scaleControlValue.value = defaultControlValue + '%';
    imgUploadPreview.style.transform = 'scale' + '(' + defaultControlValue / 100 + ')';
    window.effects.effectPin.classList.add('hidden');
    window.hashtags.hashtags.value = '';
    window.effects.effects[defaultEffect].checked = true;
  };
  // вывод сообщение
  var showMessage = function (status) {
    var main = document.querySelector('main');
    var messageTemplate = document.querySelector('#' + status).content.querySelector('.' + status);
    var message = messageTemplate.cloneNode(true);
    var button = message.querySelector('.' + status + '__button');

    var removeMessage = function () {
      message.remove();
      window.removeEventListener('click', removeMessage);
      window.removeEventListener('keydown', removeMessageOnEscape);
    };

    var removeMessageOnEscape = function (evt) {
      if (evt.key === 'Escape') {
        removeMessage();
      }
    };

    main.appendChild(message);

    button.addEventListener('click', removeMessage);
    window.addEventListener('keydown', removeMessageOnEscape);
    window.addEventListener('click', removeMessage);
  };
  // отправка данных
  var uploadImage = function (evt) {
    window.backend.uploadData(new FormData(uploadForm), function () {
      resetModalSettings();
      closeUploadOverlay();
      uploadFile.value = '';
      showMessage('success');
    }, function () {
      resetModalSettings();
      closeUploadOverlay();
      uploadFile.value = '';
      showMessage('error');
    });
    evt.preventDefault();
  };
  // загрузка изображения
  uploadFile.addEventListener('change', function () {
    resetModalSettings();
    openModal(uploadOverlay);
    uploadForm.addEventListener('submit', uploadImage);
  });

  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    uploadForm.reset();
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
})();
