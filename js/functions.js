'use strict';
// модуль с функциями
window.functions = (function () {
  var comment = document.querySelector('.text__description');
  return {
    generateRandomValue: function (min, max) {
      var randomValue = Math.round(Math.random() * (max - min) + min);
      return randomValue;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === 'Escape' && window.hashtags.hashtags !== document.activeElement && comment !== document.activeElement) {
        action();
      }
    }
    // onPopupEscPress: function (evt, action) {
    //   if (evt.key === 'Escape' && window.hashtags.hashtags !== document.activeElement && comment !== document.activeElement) {
    //     evt.preventDefault();
    //     action();
    //     // window.uploadPicture.closeUploadOverlay();
    //     // window.preview.closeBigPicture();
    //   }
    // }
  };
})();

