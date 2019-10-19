'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var createErrorTemplate = function (message, buttonsFormError, buttonName) {
    if (buttonsFormError) {
      errorTemplate.querySelector('.error__buttons').classList.remove('hidden');
      for (var i = 0; i <= buttonName.length - 1; i++) {
        var button = document.createElement('button');
        button.className = 'error__button';
        button.type = 'button';
        button.textContent = buttonName[i];
        errorTemplate.querySelector('.error__buttons').appendChild(button);
      }
    }
    var cloneElement = errorTemplate.cloneNode(true);
    cloneElement.querySelector('.error__title').textContent = message;
    return cloneElement;
  };
  window.fragment.appendChild(createErrorTemplate(window.util.error, window.util.buttonsFormError, window.util.buttonName));
  main.appendChild(window.fragment);
})();
