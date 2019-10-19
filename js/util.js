'use strict';

(function () {
  var modulesSuccess = ['description-photo', 'big-photo', 'upload-file', 'messages', 'validity'];
  var modulesError = ['error'];

  var onError = function () {
    window.fragment = document.createDocumentFragment();
    connectionSkripts(modulesError, 'head');
  };

  var onSuccess = function (data) {
    var descriptionPhoto = data;
    var COUNT_PICTURES_ON_PAGE = descriptionPhoto.length;
    var fragment = document.createDocumentFragment();

    function isBlank(text) {
      return text === undefined || text === null || text.trim() === '';
    }

    function contains(elements, needle) {
      var seen = false;
      for (var i = 0; i < elements.length; i++) {
        seen = elements[i] === needle;
        if (seen) {
          break;
        }
      }
      return seen;
    }

    /**
     * Returns value bounded to the range.
     *
     * @example bound(50, 100, 95)  // 95
     * @example bound(50, 100, 25)  // 50
     * @example bound(50, 100, 125) // 100
     *
     * @param {number} min - minimum that the {@code value} can not be less than.
     * @param {number} max - maximum that the {@code value} can not be greater than.
     * @param {number} value - the value to check whether it is in bounds.
     * @return {number} - the {@code min} if the {@code value} less than the {@code min},
     *                    the {@code max} if the {@code value} greater than the {@code max},
     *                    otherwise the {@code value} itself.
     */
    function bound(min, max, value) {
      return Math.max(min, Math.min(value, max));
    }
    var KEYCODE = {
      ESC: 27,
      ENTER: 13
    };

    window.util = {
      COUNT_PICTURES_ON_PAGE: COUNT_PICTURES_ON_PAGE,
      KEYCODE: KEYCODE,
      fragment: fragment,
      descriptionPhoto: descriptionPhoto,
      isBlank: isBlank,
      contains: contains,
      bound: bound
    };

    connectionSkripts(modulesSuccess, 'head');
  };

  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);

  function connectionSkripts(modules, where) {
    for (var mod = 1; mod <= modules.length; mod++) {
      var script = document.createElement('script');
      script.setAttribute('src', 'js/' + modules[mod - 1] + '.js');
      var whereThis = document.querySelector(where);
      whereThis.appendChild(script);
    }
  }
})();
