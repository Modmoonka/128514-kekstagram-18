'use strict';

(function () {
  window.popups = {
    error: {
      template: document.querySelector('#error')
        .content
        .querySelector('.error'),
      messageClass: '.error__title',
      eventListener: function () {
        document.querySelector('.error').addEventListener('click', function (evt) {
          if (evt.target.tagName === 'SECTION') {
            window.util.removeContent('.error');
          } else {
            switch (evt.target.textContent) {
              case 'Попробовать снова':
                window.uploadFile.uploadPicture();
                window.util.removeContent('.error');
                break;

              case 'Загрузить другой файл':
                window.uploadFile.closePopup();
                window.util.removeContent('.error');
                break;
            }
          }
        });

        document.querySelector('.error').addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.util.KeyKode.ESC) {
            window.util.removeContent('.error');
          }
        });
      }
    },
    success: {
      template: document.querySelector('#success')
        .content
        .querySelector('.success'),
      messageClass: '.success__title',
      eventListener: function () {
        document.querySelector('.success').addEventListener('click', function (evt) {
          if (evt.target.tagName === 'BUTTON' || evt.target.tagName === 'SECTION') {
            window.util.removeContent('.success');
          }
        });

        document.addEventListener('keydown', onPopupEscPress);
      }
    }
  };

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.util.KeyKode.ESC) {
      window.util.removeContent('.success');
      document.removeEventListener('keydown', onPopupEscPress);
    }
  }
})();
