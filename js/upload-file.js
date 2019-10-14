'use strict';

(function () {
  // Применение эффекта для изображения и Редактирование размера изображения
  document.querySelector('#upload-file').addEventListener('change', function () {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  });

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  var closePopup = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.querySelector('#upload-file').value('');
  };

  document.querySelector('.img-upload__cancel').addEventListener('click', function () {
    closePopup();
  });

  document.querySelector('.img-upload__cancel').addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
    }
  });

  document.querySelector('.img-upload__cancel').addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  });

  var line = document.querySelector('.effect-level__line');
  var depth = document.querySelector('.effect-level__depth');
  var pin = document.querySelector('.effect-level__pin');

  function writeCoordinateLevelPin(evt) {
    var offset = ((evt.offsetX * 100) / line.offsetWidth) + '%';
    pin.style.left = offset;
    depth.style.width = offset;
  }

  line.addEventListener('mouseup', function (evt) {
    writeCoordinateLevelPin(evt);
  });
})();
