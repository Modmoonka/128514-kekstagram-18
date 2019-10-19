'use strict';

(function () {
  window.load = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        switch (xhr.status) {
          case 404:
            window.util = {
              error: 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText,
              buttonsFormError: true,
              buttonName: ['Перезагрузить']
            };
            break;
        }
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      window.util = {
        error: 'Произошла ошибка соединения. Проверьте соединение и повторите попытку.',
        buttonsFormError: true,
        buttonName: ['Ок']
      };
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', url);
    xhr.send();
  };
})();
