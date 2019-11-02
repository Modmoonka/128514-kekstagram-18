'use strict';

(function () {
  var templateError = document.querySelector('#error')
    .content
    .querySelector('.error');

  var templateSuccess = document.querySelector('#success')
    .content
    .querySelector('.success');

  var KEYCODE = {
    ESC: 27,
    ENTER: 13
  };
  var HTTP_ERROR = {
    '200': 'OK',
    '401': 'NOT_AUTHORIZED',
    '404': 'NOT_FOUND',
    'unknown': 'UNKNOWN'
  };
  var HTTP_CODE = {
    OK: 200,
    NOT_AUTHORIZED: 401,
    NOT_FOUND: 404
  };

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

  /**
   * Show pop up with the given {@code content}.
   *
   * @param {HTMLElement|String} content
   */
  function showPopup(content, template) {
    var element = typeof content === 'string' ? template(content) : content;
    document.querySelector('main').appendChild(element);
    window.uploadFile.eventListener();
  }

  function show(element) {
    element.classList.remove('hidden');
  }

  function hide(element) {
    element.classList.add('hidden');
  }

  window.util = {
    KEYCODE: KEYCODE,
    http: {
      ERROR: HTTP_ERROR,
      CODE: HTTP_CODE
    },
    isBlank: isBlank,
    contains: contains,
    bound: bound,
    showPopup: showPopup,
    hide: hide,
    show: show,
    template: {
      createTemplateError: function (message) {
        var cloneElement = templateError.cloneNode(true);
        cloneElement.querySelector('.error__title').textContent = message;
        return cloneElement;
      },

      createTemplateSuccess: function (message) {
        var cloneElement = templateSuccess.cloneNode(true);
        cloneElement.querySelector('.success__title').textContent = message;
        return cloneElement;
      }
    }
  };
})();
