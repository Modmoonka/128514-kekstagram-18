'use strict';

(function () {
  var templateLoad = document.querySelector('#messages')
    .content
    .querySelector('.img-upload__message');
  var cloneTemplate;

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

    // xhr.addEventListener('loadend', function () {
    //   cloneTemplate = templateLoad.cloneNode(true);
    //   document.querySelector('main').appendChild(cloneTemplate);
    // });

    xhr.addEventListener('load', function () {

      // document.querySelector('main').removeChild(document.querySelector('.img-upload__message'));

      if (xhr.status === window.util.http.CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError(window.util.http.ERROR[xhr.status] || window.util.http.ERROR.unknown);
      }
    });

    xhr.addEventListener('error', function () {
      onError(window.util.http.ERROR[xhr.status] || window.util.http.ERROR.unknown);
    });

    xhr.addEventListener('timeout', function () {
      window.util.showPopup('Запрос не успел выполниться за ' + xhr.timeout + 'мс', window.util.template.createTemplateError);
    });

    xhr.open(method, url);
    xhr.send(data);
  }

  function api(path) {
    return 'https://js.dump.academy/kekstagram' + (path || '');
  }

  window.service = {
    uploadPicture: function (picture, onSuccess, onError) {
      post(api(), onSuccess, onError, picture);
    },
    loadPictures: function (onSuccess, onError) {
      get(api('/data'), onSuccess, onError);
    }
  };
})();
