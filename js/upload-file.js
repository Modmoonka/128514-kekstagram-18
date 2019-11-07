'use strict';

(function () {
  var DOM = {
    form: document.querySelector('.img-upload__form'),
    overlay: document.querySelector('.img-upload__overlay'),
    range: {
      effectLevel: document.querySelector('.img-upload__effect-level'),
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
    },
    effectslist: {
      efectNone: document.querySelector('.effects__preview--none'),
      efectChrome: document.querySelector('.effects__preview--chrome'),
      efectSepia: document.querySelector('.effects__preview--sepia'),
      efectMarvin: document.querySelector('.effects__preview--marvin'),
      efectPhobos: document.querySelector('.effects__preview--phobos'),
      efectHeat: document.querySelector('.effects__preview--heat')
    }
  };

  function applyefect(className) {
    DOM.img.preview.children[0].classList = '';
    DOM.img.preview.children[0].classList.add(className);
  }

  function checkClassAndAddEfect(value) {
    switch (DOM.img.preview.children[0].classList[0]) {
      case 'effects__preview--none':
        DOM.img.preview.style.filter = '';
        window.util.hide(DOM.range.effectLevel);
        break;
      case 'effects__preview--chrome':
        window.util.show(DOM.range.effectLevel);
        value /= 100;
        DOM.img.preview.style.filter = 'grayscale(' + value + ')';
        break;
      case 'effects__preview--sepia':
        window.util.show(DOM.range.effectLevel);
        value /= 100;
        DOM.img.preview.style.filter = 'sepia(' + value + ')';
        break;
      case 'effects__preview--marvin':
        window.util.show(DOM.range.effectLevel);
        value += '%';
        DOM.img.preview.style.filter = 'invert(' + value + ')';
        break;
      case 'effects__preview--phobos':
        window.util.show(DOM.range.effectLevel);
        value *= 0.03;
        value += 'px';
        DOM.img.preview.style.filter = 'blur(' + value + ')';
        break;
      case 'effects__preview--heat':
        window.util.show(DOM.range.effectLevel);
        value *= 0.03;
        DOM.img.preview.style.filter = 'brightness(' + value + ')';
        break;
      default:
        DOM.img.preview.style.filter = '';
        window.util.hide(DOM.range.effectLevel);
        break;
    }
  }

  (function init() {
    document.querySelector('#upload-file').addEventListener('change', function () {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
      DOM.form.addEventListener('keydown', onPopupEscPress);
      checkClassAndAddEfect(0);
    });

    DOM.button.cancel.addEventListener('click', function () {
      window.uploadFile.closePopup();
    });

    DOM.button.cancel.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KEYCODE.ENTER) {
        window.uploadFile.closePopup();
      }
    });

    DOM.button.cancel.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KEYCODE.ESC) {
        window.uploadFile.closePopup();
      }
    });

    // Размер картинки

    DOM.button.controlSmaller.addEventListener('click', function () {
      var valueControl = DOM.input.caleControl.value.substring(0, DOM.input.caleControl.value.length - 1);
      if (valueControl - 25 >= 25) {
        valueControl -= 25;
      }
      DOM.input.caleControl.value = valueControl;
      DOM.input.caleControl.value += '%';
      valueControl /= 100;
      DOM.img.preview.style.transform = 'scale(' + valueControl + ')';
    });

    DOM.button.controlBigger.addEventListener('click', function () {
      var valueControl = DOM.input.caleControl.value.substring(0, DOM.input.caleControl.value.length - 1);
      if (Number(valueControl) + 25 <= 100) {
        valueControl = Number(valueControl) + 25;
      }
      DOM.input.caleControl.value = valueControl;
      DOM.input.caleControl.value += '%';
      valueControl /= 100;
      DOM.img.preview.style.transform = 'scale(' + valueControl + ')';
    });

    // Применение эфекта

    DOM.effectslist.efectNone.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      checkClassAndAddEfect(0);
    });

    DOM.effectslist.efectChrome.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEfect(value);
    });

    DOM.effectslist.efectHeat.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEfect(value);
    });

    DOM.effectslist.efectMarvin.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEfect(value);
    });

    DOM.effectslist.efectPhobos.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEfect(value);
    });

    DOM.effectslist.efectSepia.addEventListener('click', function (evt) {
      applyefect(evt.target.classList[1]);
      var value = DOM.range.pin.style.left.substring(0, DOM.range.pin.style.left.length - 1);
      checkClassAndAddEfect(value);
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
        checkClassAndAddEfect(Math.round(value));
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
      } else if (!window.validity.validator.checkComments(DOM.comment.comment.value)) {
        var customValidityMessageComment = window.validity.validator.getInvalidities(window.validity.validator.invalidities.comment);
        DOM.comment.comment.setCustomValidity(customValidityMessageComment);
        DOM.comment.comment.reportValidity();
      } else {
        DOM.hashTag.hashTag.setCustomValidity('');
        DOM.comment.comment.setCustomValidity('');
        window.uploadFile.uploadPicture();
      }
    });
  })();

  function hideForm() {
    window.util.hide(DOM.overlay);
    window.util.showPopup('Image uploaded successfully', window.uploadFile.success);
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.util.KEYCODE.ESC) {
      window.uploadFile.closePopup();
    }
  }

  window.uploadFile = {
    uploadPicture: function () {
      window.service.uploadPicture(
          new FormData(DOM.form),
          hideForm,
          function (errorCode) {
            switch (errorCode) {
              case window.util.http.ERROR[window.util.http.CODE.NOT_AUTHORIZED]:
                window.util.showPopup('Not authorized', window.uploadFile.error);
                break;
              case window.util.http.ERROR[window.util.http.CODE.NOT_FOUND]:
                window.util.showPopup('Page not found', window.uploadFile.error);
                break;
              default:
                window.util.showPopup('Really do not know what the heck happened!=/', window.uploadFile.error);
            }
          }
      );
    },
    closePopup: function () {
      window.util.hide(DOM.overlay);
      DOM.input.file.value = '';
    },
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
                // document.querySelector('.img-upload__start').onclick();
                window.util.removeContent('.error');
                break;
            }
          }
        });

        document.querySelector('.error').addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.util.KEYCODE.ESC) {
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

        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === window.util.KEYCODE.ESC) {
            window.util.removeContent('.success');
          }
        });
      }
    }
  };
})();
