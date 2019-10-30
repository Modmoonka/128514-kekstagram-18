'use strict';

(function () {
  var DOM = {
    form: document.querySelector('.img-upload__form'),
    overlay: document.querySelector('.img-upload__overlay'),
    range: {
      line: document.querySelector('.effect-level__line'),
      depth: document.querySelector('.effect-level__depth'),
      pin: document.querySelector('.effect-level__pin')
    },
    input: {
      file: document.querySelector('#upload-file')
    },
    button: {
      cancel: document.querySelector('.img-upload__cancel'),
      submit: document.querySelector('.img-upload__submit')
    },
    hashTag: {
      hashTag: document.querySelector('.text__hashtags'),
      formImgUpload: document.querySelector('.img-upload__form'),
    },
    comment: {
      comment: document.querySelector('.text__description'),
      formSubmitComments: document.querySelector('.social__footer-btn')
    }
  };

  (function init() {
    document.querySelector('#upload-file').addEventListener('change', function () {
      document.querySelector('.img-upload__overlay').classList.remove('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    });

    DOM.button.cancel.addEventListener('click', function () {
      closePopup();
    });

    DOM.button.cancel.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KEYCODE.ENTER) {
        closePopup();
      }
    });

    DOM.button.cancel.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.KEYCODE.ESC) {
        closePopup();
      }
    });

    DOM.range.line.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
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
        percentage = (window.util.bound(0, DOM.range.line.offsetWidth, DOM.range.pin.offsetLeft - shift.x) * 100 / DOM.range.line.offsetWidth) + '%';
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
        uploadPicture();
      }
    });
  })();

  function uploadPicture() {
    window.service.uploadPicture(
        new FormData(DOM.form),
        hideForm,
        function (errorCode) {
          switch (errorCode) {
            case window.util.http.ERROR[window.util.http.CODE.NOT_AUTHORIZED]:
              window.util.showPopup('Not authorized', window.util.template.createTemplateError);
              break;
            case window.util.http.ERROR[window.util.http.CODE.NOT_FOUND]:
              var error = document.querySelector('#error');
              errorCode.textContent = 'bla';
              window.util.showPopup(error, window.util.template.createTemplateError);
              break;
            default:
              window.util.showPopup('Really do not know what the heck happened!=/', window.util.template.createTemplateError);
          }
        }
    );
  }

  function hideForm() {
    window.util.hide(DOM.overlay);
    window.util.showPopup('Image uploaded successfully', window.util.template.createTemplateSuccess);
  }

  function closePopup() {
    window.util.hide(DOM.overlay);
    DOM.input.file.value('');
  }

  function onPopupEscPress(evt) {
    if (evt.keyCode === window.util.KEYCODE.ESC) {
      closePopup();
    }
  }

  window.uploadFile = {};
})();
