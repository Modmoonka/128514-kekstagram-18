'use strict';

(function () {
  var galleryElement = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  function renderPicture(picture) {
    var element = templatePicture.cloneNode(true);
    element.querySelector('.picture__img').src = picture.url;
    element.querySelector('.picture__likes').textContent = picture.likes;
    element.querySelector('.picture__comments').textContent = picture.comments.length;
    return element;
  }

  window.gallery = {
    showPictures: function (pictures) {
      var fragment = document.createDocumentFragment();
      window.accessKey = -1;

      for (var i = 0; i < pictures.length; i++) {
        fragment.appendChild(renderPicture(pictures[i])).accessKey = i;
      }
      galleryElement.appendChild(fragment);

      document.addEventListener('click', function (evt) {
        window.accessKey = evt.path[1].accessKey;
        if (window.accessKey >= 0) {
          window.bigPhoto.render(pictures[window.accessKey]);
        }
      });

      galleryElement.addEventListener('keydown', function (evt) {
        window.accessKey = evt.path[0].accessKey;
        if (evt.keyCode === window.util.KEYCODE.ENTER && window.accessKey >= 0) {
          window.bigPhoto.render(pictures[window.accessKey]);
        }
      });
    }
  };
})();
