'use strict';

(function () {
  var templateComments = document.querySelector('#comments')
    .content
    .querySelector('.social__comment');

  var getComments = function (template, objAutor) {
    var cloneElement = template.cloneNode(true);
    cloneElement.querySelector('.social__picture').src = objAutor.avatar;
    cloneElement.querySelector('.social__picture').alt = objAutor.name;
    cloneElement.querySelector('.social__text').textContent = objAutor.message;
    return cloneElement;
  };

  var showBigFoto = function (object) {
    var bigPicture = document.querySelector('.big-picture');
    var socialComments = document.querySelector('.social__comments');
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').children[0].src = object.url;
    bigPicture.querySelector('.likes-count').textContent = object.likes;
    bigPicture.querySelector('.comments-count').textContent = object.comments.length;
    bigPicture.querySelector('.social__caption').textContent = object.description;
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
    for (var k = 0; k <= object.comments.length - 1; k++) {
      window.util.fragment.appendChild(getComments(templateComments, object.comments[k]));
    }
    socialComments.appendChild(window.util.fragment);
    return bigPicture;
  };

  // Показ выбранных фото
  var openBigFoto = function (evt) {
    var accessKey;
    if (evt.keyCode === window.util.KEYCODE.ENTER) {
      accessKey = evt.path[0].accessKey - 1;
    } else {
      accessKey = evt.path[1].accessKey - 1;
    }
    if (accessKey >= 0) {
      showBigFoto(window.util.descriptionFoto[accessKey]);
      document.addEventListener('keydown', function (e) {
        if (e.keyCode === window.util.KEYCODE.ESC) {
          closeBigFoto();
        }
      });
    }
  };

  document.addEventListener('click', function (evt) {
    openBigFoto(evt);
  });

  document.addEventListener('keydown', function (evt) {
    openBigFoto(evt);
  });

  // Закрытие большой фотки

  var closeBigFoto = function () {
    document.querySelector('.big-picture').classList.add('hidden');
  };

  document.querySelector('.big-picture__cancel').addEventListener('click', function () {
    closeBigFoto();
  });
})();
