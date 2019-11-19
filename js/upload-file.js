'use strict';

(function () {
  var STEP = 25;
  var VALUE_MIN = 25;
  var VALUE_MAX = 100;
  var PERCENTAGE = 100;
  var DOM = {
    form: document.querySelector('.img-upload__form'),
    overlay: document.querySelector('.img-upload__overlay'),
    range: {
      line: document.querySelector('.effect-level__line'),
      depth: document.querySelector('.effect-level__depth'),
      pin: document.querySelector('.effect-level__pin')
    },
    input: {
      file: document.querySelector('#upload-file'),
      caleControl: document.querySelector('.scale__control--value')
    },
    button: {
      cancel: document.querySelector('.img-upload__cancel'),
      submit: document.querySelector('.img-upload__submit'),
      controlSmaller: document.querySelector('.scale__control--smaller'),
      controlBigger: document.querySelector('.scale__control--bigger')
    },
    hashTag: {
      hashTag: document.querySelector('.text__hashtags'),
      formImgUpload: document.querySelector('.img-upload__form'),
    },
    comment: {
      comment: document.querySelector('.text__description'),
      formSubmitComments: document.querySelector('.social__footer-btn')
    },
    img: {
      preview: document.querySelector('.img-upload__preview')
    }
  };

  (function init() {
    document.querySelector('#upload-file').addEventListener('change', function () {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
      DOM.form.addEventListener('keydown', onPopupEscPress);
      window.filter.checkClassAndAddEffect(0);
    });

    DOM.button.cancel.addEventListener('click', function () {
      window.uploadFile.closePopup();
    });

    DOM.button.cancel.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KEYCODE.ENTER) {
        window.uploadFile.closePopup();
      }
    });

    // Размер картинки

    DOM.button.controlSmaller.addEventListener('click', function () {
      var valueControl = DOM.input.caleControl.value.substring(0, DOM.input.caleControl.value.length - 1);
      if (valueControl - STEP >= VALUE_MIN) {
        valueControl -= STEP;
      }
      DOM.input.caleControl.value = valueControl;
      DOM.input.caleControl.value += '%';
      valueControl /= PERCENTAGE;
      DOM.img.preview.style.transform = 'scale(' + valueControl + ')';
    });

    DOM.button.controlBigger.addEventListener('click', function () {
      var valueControl = DOM.input.caleControl.value.substring(0, DOM.input.caleControl.value.length - 1);
      if (Number(valueControl) + STEP <= VALUE_MAX) {
        valueControl = Number(valueControl) + STEP;
      }
      DOM.input.caleControl.value = valueControl;
      DOM.input.caleControl.value += '%';
      valueControl /= PERCENTAGE;
      DOM.img.preview.style.transform = 'scale(' + valueControl + ')';
    });

    // Перемещение pin

    DOM.range.line.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var value;
      var percentage = evt.target === DOM.range.pin ? DOM.range.pin.offsetLeft : (evt.offsetX * 100 / DOM.range.line.offsetWidth) + '%';
      DOM.range.depth.style.width = percentage;
      DOM.range.pin.style.left = percentage;
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
        value = (window.util.bound(0, DOM.range.line.offsetWidth, DOM.range.pin.offsetLeft - shift.x) * 100 / DOM.range.line.offsetWidth);
        percentage = value + '%';
        window.filter.checkClassAndAddEffect(Math.round(value));
        DOM.range.depth.style.width = percentage;
        DOM.range.pin.style.left = percentage;
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    // отправка

    DOM.button.submit.addEventListener('click', function (evt) {
      evt.preventDefault();
      if (!window.validity.validator.checkHashTag(DOM.hashTag.hashTag.value)) {
        var customValidityMessageHashTag = window.validity.validator.getInvalidities(window.validity.validator.invalidities.hashTag);
        DOM.hashTag.hashTag.setCustomValidity(customValidityMessageHashTag);
        DOM.hashTag.hashTag.reportValidity();
        DOM.hashTag.hashTag.style.borderColor = 'red';
        DOM.comment.comment.style.borderColor = '';
      } else if (!window.validity.validator.checkComments(DOM.comment.comment.value)) {
        var customValidityMessageComment = window.validity.validator.getInvalidities(window.validity.validator.invalidities.comment);
        DOM.comment.comment.setCustomValidity(customValidityMessageComment);
        DOM.comment.comment.reportValidity();
        DOM.hashTag.hashTag.style.borderColor = '';
        DOM.comment.comment.style.borderColor = 'red';
      } else {
        DOM.hashTag.hashTag.setCustomValidity('');
        DOM.hashTag.hashTag.style.borderColor = '';
        DOM.comment.comment.setCustomValidity('');
        DOM.comment.comment.style.borderColor = '';
        window.uploadFile.uploadPicture();
      }
    });

  })();

  function hideForm() {
    formReset();
    window.util.showPopup('Image uploaded successfully', window.popups.success);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.util.KEYCODE.ESC) {
      window.uploadFile.closePopup();
    }
  }

  function uploadPicture() {
    window.service.uploadPicture(
        new FormData(DOM.form),
        hideForm,
        function (errorCode) {
          switch (errorCode) {
            case window.util.http.ERROR[window.util.http.CODE.NOT_AUTHORIZED]:
              document.querySelector('.img-upload__overlay').classList.add('hidden');
              window.util.showPopup('Not authorized', window.popups.error);
              break;
            case window.util.http.ERROR[window.util.http.CODE.NOT_FOUND]:
              document.querySelector('.img-upload__overlay').classList.add('hidden');
              window.util.showPopup('Page not found', window.popups.error);
              break;
            default:
              document.querySelector('.img-upload__overlay').classList.add('hidden');
              window.util.showPopup('Really do not know what the heck happened!=/', window.popups.error);
          }
        }
    );
    document.querySelector('#upload-file').value = '';
  }

  function formReset() {
    window.util.hide(DOM.overlay);
    DOM.range.depth.style.width = '20%';
    DOM.range.pin.style.left = '20%';
    DOM.img.preview.children[0].classList = 'effects__preview--none';
    DOM.input.caleControl.value = '100%';
    DOM.img.preview.style.transform = 'scale(1)';
  }

  function closePopup() {
    formReset();
    DOM.input.file.value = '';
  }

  window.uploadFile = {
    uploadPicture: uploadPicture,
    closePopup: closePopup
  };
})();
