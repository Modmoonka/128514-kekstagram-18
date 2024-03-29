'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var main = document.querySelector('main');

  var KeyKode = {
    ESC: 27,
    ENTER: 13
  };
  var HttpError = {
    '200': 'OK',
    '401': 'NOT_AUTHORIZED',
    '404': 'NOT_FOUND',
    'unknown': 'UNKNOWN'
  };
  var HttpCode = {
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

  function removeContent(className) {
    if (main.querySelector(className)) {
      main.querySelector(className).remove();
    }
  }

  function removeClass(elements, className) {
    elements.forEach(function (element) {
      element.classList.remove(className);
    });
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

  function createTemplate(template, className, message) {
    var clonedElement = template.cloneNode(true);
    clonedElement.querySelector(className).textContent = message;
    return clonedElement;
  }

  /**
   * Show pop up with the given {content, template}.
   *
   * @param {String} content
   * @param {Object} template
   */
  function showPopup(content, template) {
    var element = createTemplate(template.template, template.messageClass, content);
    main.appendChild(element);
    template.eventListener();
  }

  function show(element) {
    element.classList.remove('hidden');
  }

  function hide(element) {
    element.classList.add('hidden');
  }

  function debounce(cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.util = {
    KeyKode: KeyKode,
    Http: {
      ERROR: HttpError,
      CODE: HttpCode
    },
    isBlank: isBlank,
    contains: contains,
    bound: bound,
    showPopup: showPopup,
    hide: hide,
    show: show,
    removeContent: removeContent,
    removeClass: removeClass,
    debounce: debounce
  };
})();
