'use strict';

(function () {
  // Применение эффекта для изображения и Редактирование размера изображения
  document.querySelector('#upload-file').addEventListener('change', function () {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  });

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.KEYCODE.ESC) {
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
    if (evt.keyCode === window.util.KEYCODE.ENTER) {
      closePopup();
    }
  });

  document.querySelector('.img-upload__cancel').addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KEYCODE.ESC) {
      closePopup();
    }
  });

  var line = document.querySelector('.effect-level__line');
  var depth = document.querySelector('.effect-level__depth');
  var pin = document.querySelector('.effect-level__pin');

  line.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var percentage = evt.target === pin ? pin.offsetLeft : (evt.offsetX * 100 / line.offsetWidth) + '%';
    depth.style.width = percentage;
    pin.style.left = percentage;
    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };
      percentage = (window.util.bound(0, line.offsetWidth, pin.offsetLeft - shift.x) * 100 / line.offsetWidth) + '%';
      depth.style.width = percentage;
      pin.style.left = percentage;
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
