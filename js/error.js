'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var createErrorTemplate = function (template, message, buttonsFlag, buttonNameAgain, buttonNameCancel) {
    var cloneElement = template.cloneNode(true);
    cloneElement.querySelector('.error__title').textContent = message;
    if (buttonsFlag) {
      template.querySelector('.error__buttons').classList.remove('hidden');
      cloneElement.querySelectorAll('.error__button')[0].textContent = buttonNameAgain;
      cloneElement.querySelectorAll('.error__button')[1].textContent = buttonNameCancel;
    }
    return cloneElement;
  };

  window.util.fragment.appendChild(createErrorTemplate(errorTemplate, window.error, false, '123', '123'));
  // console.log(main);
  main.appendChild(window.util.fragment);
})();
