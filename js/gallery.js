'use strict';

(function () {
  var galleryElement = document.querySelector('.pictures');
  var templatePicture = document.querySelector('#picture')
    .content
    .querySelector('.picture');


  function renderPicture(picture, id) {
    var element = templatePicture.cloneNode(true);
    element.querySelector('.picture__img').accessKey = id;
    element.querySelector('.picture__img').src = picture.url;
    element.querySelector('.picture__likes').textContent = picture.likes;
    element.querySelector('.picture__comments').textContent = picture.comments.length;
    // console.dir(element);
    return element;
  }

  window.gallery = {
    showPictures: function (pictures) {
      var fragment = document.createDocumentFragment();
      window.accessKey = -1;

      for (var i = 0; i < pictures.length; i++) {
        fragment.appendChild(renderPicture(pictures[i], i));
      }
      galleryElement.appendChild(fragment);

      galleryElement.addEventListener('click', function (evt) {
        if (evt.target.accessKey) {
          window.bigPhoto.render(pictures[evt.target.accessKey]);
        }
      });

      galleryElement.addEventListener('keydown', function (evt) {
        if (evt.target.tagName === 'A') {
          if (evt.keyCode === window.util.KEYCODE.ENTER && evt.target.children[0].accessKey >= 0) {
            window.bigPhoto.render(pictures[evt.target.children[0].accessKey]);
          }
        }
      });
    }
  };
})();
