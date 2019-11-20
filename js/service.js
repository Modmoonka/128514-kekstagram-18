'use strict';

(function () {
  var NETWORK_TIMEOUT = 1000000;

  function get(url, onSuccess, onError) {
    request('GET', url, onSuccess, onError);
  }

  function post(url, onSuccess, onError, data) {
    request('POST', url, onSuccess, onError, data);
  }

  function request(method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = NETWORK_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === window.util.Http.CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError(window.util.Http.ERROR[xhr.status] || window.util.Http.ERROR.unknown);
      }
    });

    xhr.addEventListener('error', function () {
      onError(window.util.Http.ERROR[xhr.status] || window.util.Http.ERROR.unknown);
    });

    xhr.addEventListener('timeout', function () {
      window.util.showPopup('Запрос не успел выполниться за ' + xhr.timeout + 'мс', window.popups.error);
    });

    xhr.open(method, url);
    xhr.send(data);
  }

  function getPath(path) {
    return 'https://js.dump.academy/kekstagram' + (path || '');
  }

  window.service = {
    uploadPicture: function (picture, onSuccess, onError) {
      post(getPath(), onSuccess, onError, picture);
    },
    loadPictures: function (onSuccess, onError) {
      get(getPath('/data'), onSuccess, onError);
    }
  };
})();
